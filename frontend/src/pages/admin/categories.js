import React, { useState } from "react";
import AdminService from "../../services/adminService";
import Header from "../../components/utils/header";
import Loading from "../../components/utils/loading";
import useCategories from "../../hooks/useCategories";
import Info from "../../components/utils/Info";
import Container from "../../components/utils/Container";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast/headless";
import Modal from "../../components/utils/Modal";

function AdminCategoriesManagement() {
  const [data, isFetching] = useCategories([]);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", type: "" });

  const disableOrEnable = async (categoryId) => {
    await AdminService.disableOrEnableCategory(categoryId).then(
      (response) => {
        if (response.data.status === "SUCCESS") {
          window.location.reload();
        }
      },
      () => {
        toast.error("Failed to update category: Try again later!");
      }
    );
  };

  const addNewCategory = async () => {
    if (!newCategory.name || !newCategory.type) {
      toast.error("Please fill out all fields!");
      return;
    }

    await AdminService.addCategory(newCategory).then(
      (response) => {
        if (response.data.status === "SUCCESS") {
          toast.success("Category added successfully!");
          setNewCategory({ name: "", type: "" });
          setShowModal(false);
          window.location.reload();
        }
      },
      () => {
        toast.error("Failed to add category: Try again later!");
      }
    );
  };

  return (
    <Container activeNavId={6}>
      <Header title="Categories" />
      <Toaster />
      {isFetching && <Loading />}
      {!isFetching && data.length === 0 && (
        <Info text={"No categories found!"} />
      )}
      {!isFetching && data.length !== 0 && (
        <table>
          <CategoriesTableHeader />
          <CategoriesTableBody data={data} disableOrEnable={disableOrEnable} />
        </table>
      )}
      <div
        className="t-btn input-box"
        style={{ paddingTop: 20, justifyContent: "center" }}
      >
        <input
          type="submit"
          value={"Add"}
          onClick={() => setShowModal(true)}
          className={"button button-fill"}
        />
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              //   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            {/* Title */}
            <h3 style={{ margin: 0, textAlign: "center", color: "#333" }}>
              Add New Category
            </h3>

            {/* Category Name Input */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                Category Name
              </label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                }}
                placeholder="Enter category name"
              />
            </div>

            {/* Category Type Selection */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                Type
              </label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <label
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <input
                    type="radio"
                    name="type"
                    value="1"
                    checked={newCategory.type === "1"}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, type: e.target.value })
                    }
                  />
                  Expense
                </label>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <input
                    type="radio"
                    name="type"
                    value="2"
                    checked={newCategory.type === "2"}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, type: e.target.value })
                    }
                  />
                  Income
                </label>
              </div>
            </div>

            {/* Add Button */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                gap: 16,
                position: "relative",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#6aa412",
                  color: "#fff",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={addNewCategory}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#6aa412",
                  color: "#fff",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Add Category
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Container>
  );
}

export default AdminCategoriesManagement;

function CategoriesTableHeader() {
  return (
    <tr>
      <th>Category Id</th>
      <th>Category Name</th>
      <th>Type</th>
      <th>Enabled</th>
      <th>Action</th>
    </tr>
  );
}

function CategoriesTableBody({ data, disableOrEnable, onUpdateCategory }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const openEditModal = (category) => {
    setEditCategory(category);
    console.log(category);
    setShowEditModal(true);
  };

  const updateCategory = async (category) => {
    console.log("!! > ", category);
    await AdminService.updatecategory(category).then(
      (response) => {
        if (response.data.status === "SUCCESS") {
          toast.success("Category updated successfully!");
          window.location.reload();
        }
      },
      () => {
        toast.error("Failed to update category: Try again later!");
      }
    );
  };

  const handleSave = () => {
    updateCategory(editCategory);
    setShowEditModal(false);
  };

  return (
    <>
      {data.map((item) => (
        <tr key={item.categoryId}>
          <td>{"C" + String(item.categoryId).padStart(5, "0")}</td>

          <td>{item.categoryName}</td>

          <td>{item.transactionType.transactionTypeName}</td>
          <td style={{ color: item.enabled ? "#6aa412" : "#ff0000" }}>
            {item.enabled ? "Enabled" : "Disabled"}
          </td>

          <td style={{ display: "flex", gap: "5px" }}>
            <button
              onClick={() => disableOrEnable(item.categoryId)}
              style={{
                backgroundColor: item.enabled ? "#ff0000" : "#6aa412",
                color: "#fff",
                padding: "5px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {item.enabled ? "Disable" : "Enable"}
            </button>
            <button
              onClick={() => openEditModal(item)}
              style={{
                backgroundColor: "#008cba",
                color: "#fff",
                padding: "5px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
          </td>
        </tr>
      ))}

      {/* Edit Modal */}
      {showEditModal && editCategory && (
        <Modal onClose={() => setShowEditModal(false)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            <h3 style={{ margin: 0, textAlign: "center", color: "#333" }}>
              Edit Category
            </h3>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                Category Name
              </label>
              <input
                type="text"
                value={editCategory.categoryName || ""}
                onChange={(e) =>
                  setEditCategory({
                    ...editCategory,
                    categoryName: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                Type
              </label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <label
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <input
                    type="radio"
                    name="type"
                    value="TYPE_EXPENSE"
                    checked={
                      editCategory.transactionType.transactionTypeName ===
                      "TYPE_EXPENSE"
                    }
                    onChange={(e) =>
                      setEditCategory({
                        ...editCategory,
                        transactionType: {
                          transactionTypeName: e.target.value,
                        },
                      })
                    }
                  />
                  Expense
                </label>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <input
                    type="radio"
                    name="type"
                    value="TYPE_INCOME"
                    checked={
                      editCategory.transactionType.transactionTypeName ===
                      "TYPE_INCOME"
                    }
                    onChange={(e) =>
                      setEditCategory({
                        ...editCategory,
                        transactionType: {
                          transactionTypeName: e.target.value,
                        },
                      })
                    }
                  />
                  Income
                </label>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#ddd",
                  color: "#555",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#6aa412",
                  color: "#fff",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
