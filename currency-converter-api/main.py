import os
import json
from typing import Dict
from contextlib import asynccontextmanager

from fastapi import FastAPI


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize dictionaries to hold static data
    currencies: Dict[str, str] = {}
    conversion_rates: Dict[str, float] = {}

    # Load JSON data during application startup
    base_dir = "./static_data"  # Directory where the JSON files are stored
    currencies_file = os.path.join(base_dir, "currencies.json")
    conversion_rates_file = os.path.join(base_dir, "currency_rates_usd.json")

    # Load the currencies data
    with open(currencies_file, "r", encoding="UTF-8") as file:
        currencies = json.load(file)

    # Load the conversion rates data
    with open(conversion_rates_file, "r", encoding="UTF-8") as file:
        conversion_rates = json.load(file)

    print("Currencies and conversion rates loaded!")

    # Attach the data to the app state
    app.state.currencies = currencies
    app.state.conversion_rates = conversion_rates

    # Yield control back to FastAPI (startup complete)
    yield

    # Perform any cleanup during shutdown (if needed)
    print("Application shutting down!")

# Create the FastAPI app with the lifespan context
app = FastAPI(lifespan=lifespan)

@app.get("/currencies", response_model=Dict[str, str])
async def list_currencies():
    print(app.state.currencies)
    return app.state.currencies

@app.get("/conversion-rates", response_model=Dict[str, float])
async def get_conversion_rates():
    return app.state.conversion_rates

@app.get("/convert")
async def convert_currency(
    source: str,
    target: str,
    amount: float,
):
    currencies = app.state.currencies
    conversion_rates = app.state.conversion_rates

    # Ensure currencies exist
    if source not in currencies or target not in currencies:
        return {"error": "Invalid currency code"}

    # Convert amount from `source` to USD
    if source == "usd":
        usd_amount = amount
    else:
        usd_amount = amount / conversion_rates.get(source, 1)

    # Convert USD to `target`
    if target == "usd":
        converted_amount = usd_amount
    else:
        converted_amount = usd_amount * conversion_rates.get(target, 1)

    return {
        "source": source,
        "target": target,
        "amount": amount,
        "converted_amount": converted_amount
    }
