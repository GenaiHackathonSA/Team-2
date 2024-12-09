# Currency Converter

A FastAPI-based currency conversion application that provides endpoints to fetch currency codes, conversion rates, and perform currency conversions. The application is containerized using Docker for ease of deployment.

## Features

- Fetch a list of available currencies and their codes.
- Fetch conversion rates of currencies against USD.
- Convert an amount from one currency to another.


## API Endpoints

### 1. **Get List of Currencies**

- **Endpoint**: `GET /currencies`
- **Description**: Returns a list of available currencies and their codes.
- **Example Response**:
  ```json
  {
      "usd": "United States Dollar",
      "eur": "Euro",
      "jpy": "Japanese Yen"
  }
  ```

---

### 2. **Get Conversion Rates**

- **Endpoint**: `GET /conversion-rates`
- **Description**: Returns conversion rates of all currencies against USD.
- **Example Response**:
  ```json
  {
      "usd": 1.0,
      "eur": 0.85,
      "jpy": 110.0
  }
  ```

---

### 3. **Convert Currency**

- **Endpoint**: `GET /convert`
- **Description**: Converts an amount from one currency to another.
- **Query Parameters**:
  - `source` (string): The code of the currency to convert from (e.g., `usd`).
  - `target` (string): The code of the currency to convert to (e.g., `eur`).
  - `amount` (float): The amount to convert (e.g., `100`).
- **Example Request**:
  ```
  GET /convert?source=usd&target=eur&amount=100
  ```
- **Example Response**:
  ```json
  {
      "source": "usd",
      "target": "eur",
      "amount": 100.0,
      "converted_amount": 85.0
  }
  ```

---

## Development Notes

- **Static Data**:
  - The static data files are located in the `static_data/` directory.
  - `currencies.json` contains the list of available currencies and their codes.
  - `currency_rates_usd.json` contains the conversion rates of currencies against usd.

---

## Testing the Application

1. Ensure the application is running.
2. Use tools like `curl`, `Postman`, or your browser to test the endpoints.
3. Example `curl` commands:
   - Get list of currencies:
     ```bash
     curl http://localhost:8000/currencies
     ```
   - Get conversion rates:
     ```bash
     curl http://localhost:8000/conversion-rates
     ```
   - Convert currency:
     ```bash
     curl "http://localhost:8000/convert?from_currency=usd&to_currency=eur&amount=100"
     ```