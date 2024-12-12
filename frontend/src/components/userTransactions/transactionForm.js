import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function TransactionForm({
  categories,
  onSubmit,
  isDeleting,
  isSaving,
  transaction,
  onDelete,
  currencies, // Pass available currencies as a prop
}) {
  const { register, handleSubmit, watch, reset, formState } = useForm();
  const date = useRef({});
  date.current = watch("date");
  const navigate = useNavigate();

  useEffect(() => {
    if (transaction && transaction.transactionId) {
      reset({
        category: String(transaction.categoryId),
        description: transaction.description,
        amount: transaction.amount,
        date: transaction.date.split("T")[0],
        currency: transaction.currency || "", // Pre-fill currency if available
      });
    }
  }, [reset, transaction]);

  const deleteTransaction = (e, id) => {
    e.preventDefault();
    onDelete(id);
  };

  const cancelProcess = (e) => {
    e.preventDefault();
    navigate("/user/transactions");
  };

  return (
    <form className="auth-form t-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-box">
        {/* input category */}
        <label>Transaction Category</label>
        <br />
        <div className="radio">
          {categories
            .filter((cat) => cat.enabled)
            .map((cat) => {
              return (
                <span key={cat.categoryId}>
                  <input
                    type="radio"
                    id={cat.categoryName}
                    value={cat.categoryId}
                    {...register("category", {
                      required: "Category is required",
                    })}
                  />
                  <label htmlFor={cat.categoryName}>{cat.categoryName}</label>
                </span>
              );
            })}
        </div>
        {formState.errors.category && (
          <small>{formState.errors.category.message}</small>
        )}
      </div>

      {/* input description */}
      <div className="input-box">
        <label>Transaction Description</label>
        <br />
        <input
          type="text"
          {...register("description", {
            maxLength: {
              value: 50,
              message: "Description can have at most 50 characters!",
            },
          })}
        />
        {formState.errors.description && (
          <small>{formState.errors.description.message}</small>
        )}
      </div>

      {/* input amount */}
      <div className="input-box">
        <label>Amount</label>
        <br />
        <input
          type="text"
          {...register("amount", {
            required: "Amount is required!",
            pattern: { value: /^[0-9.]{1,}$/g, message: "Invalid amount!" },
          })}
        />
        {formState.errors.amount && (
          <small>{formState.errors.amount.message}</small>
        )}
      </div>

      {/* input currency */}
      <div className="input-box">
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          Currency
        </label>
        <select
          {...register("currency", {
            required: "Currency is required",
          })}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            color: "#333",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            backgroundImage:
              "url('data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns%3D%27http%3A//www.w3.org/2000/svg%27 viewBox%3D%270 0 4 5%27%3E%3Cpath fill%3D%27%23444%27 d%3D%27M2 0L0 2h4zm0 5L0 3h4z%27/%3E%3C/svg%3E')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px top 50%",
            backgroundSize: "12px 12px",
          }}
        >
          <option value="">Select a currency</option>
          <option key={0} value="usd">
            USD
          </option>
          <option key={1} value="sar">
            SAR
          </option>
          <option key={2} value="eur">
            EUR
          </option>
          <option key={3} value="gbp">
            GBP
          </option>
        </select>
        {formState.errors.currency && (
          <small
            style={{
              color: "red",
              fontSize: "12px",
              marginTop: "5px",
              display: "block",
            }}
          >
            {formState.errors.currency.message}
          </small>
        )}
      </div>

      {/* input date */}
      <div className="input-box">
        <label>Date</label>
        <br />
        <input
          type="date"
          value={
            date.current === undefined
              ? new Date().toISOString().split("T")[0]
              : date.current
          }
          {...register("date")}
        />
        {formState.errors.date && (
          <small>{formState.errors.date.message}</small>
        )}
      </div>

      <div className="t-btn input-box">
        <input
          type="submit"
          value={isSaving ? "Saving..." : "Save Transaction"}
          className={
            isSaving ? "button button-fill loading" : "button button-fill"
          }
        />
        <input
          type="button"
          className="button outline"
          value="Cancel"
          onClick={(e) => cancelProcess(e)}
        />
      </div>
      {transaction ? (
        <div className="t-btn input-box">
          <button
            className={isDeleting ? "button delete loading" : "button delete"}
            onClick={(e) => deleteTransaction(e, transaction.transactionId)}
          >
            {isDeleting ? "Deleting..." : "Delete Transaction"}
          </button>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
}

export default TransactionForm;
