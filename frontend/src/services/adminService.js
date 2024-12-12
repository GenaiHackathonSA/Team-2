import axios from "axios";
import AuthService from "./auth.service";
import API_BASE_URL from "./auth.config";

const getAllTransactions = (pagenumber, pageSize, searchKey) => {
  return axios.get(API_BASE_URL + "/transaction/getAll", {
    headers: AuthService.authHeader(),
    params: {
      pageNumber: pagenumber,
      pageSize: pageSize,
      searchKey: searchKey,
    },
  });
};

const getAllUsers = (pagenumber, pageSize, searchKey) => {
  return axios.get(API_BASE_URL + "/user/getAll", {
    headers: AuthService.authHeader(),
    params: {
      pageNumber: pagenumber,
      pageSize: pageSize,
      searchKey: searchKey,
    },
  });
};

const disableOrEnableUser = (userId) => {
  return axios.delete(API_BASE_URL + "/user/disable", {
    headers: AuthService.authHeader(),
    params: {
      userId: userId,
    },
  });
};

const getAllcategories = () => {
  return axios.get(API_BASE_URL + "/category/getAll", {
    headers: AuthService.authHeader(),
  });
};

const addCategory = (category) => {
  return axios.post(
    API_BASE_URL + "/category/add",
    {
      categoryName: category.name,
      transactionTypeId: parseInt(category.type),
    },
    {
      headers: AuthService.authHeader(),
    }
  );
};

const updatecategory = (categroy) => {
  console.log(" >>?>> ", categroy);
  return axios.put(
    API_BASE_URL + "/category/update/" + categroy.categoryId,
    {
      categoryName: categroy.categoryName,
      transactionTypeId:
        categroy.transactionType.transactionTypeName === "TYPE_EXPENSE" ? 1 : 2,
    },
    {
      headers: AuthService.authHeader(),
    }
  );
};

const disableOrEnableCategory = (categoryId) => {
  return axios.delete(API_BASE_URL + "/category/delete", {
    headers: AuthService.authHeader(),
    params: {
      categoryId: categoryId,
    },
  });
};

const AdminService = {
  getAllTransactions,
  getAllUsers,
  disableOrEnableUser,
  getAllcategories,
  updatecategory,
  addCategory,
  disableOrEnableCategory,
};

export default AdminService;
