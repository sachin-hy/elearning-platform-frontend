import { apiConnector } from "../apiconnector";
import { categorysEndpoints } from "../apis";

// in navbar.jsx page function called in useeffect
export async function fetchSubLinks(setSubLinks) {
  try {
    const result = await apiConnector(
      "GET",
      categorysEndpoints.CATEGORYS_API,
      null,
      null,
      null,
    );

    return {
      success: true,
      data: Array.isArray(result?.data) ? result.data : [],
    };
  } catch (error) {
    console.log("Error while fetching sublinks: " + error);
    return { success: false, message: error.response.data.message };
  }
}

//  function call from courseinfo page inside useeffect
export async function fetchTags(setCategories, token) {
  try {
    const res = await apiConnector(
      "GET",
      categorysEndpoints.CATEGORYS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      null,
    );

    const safeArray = Array.isArray(res?.data) ? res.data : [];

    setCategories(safeArray);

    return { success: true };
  } catch (error) {
    setCategories([]);

    return { success: false, message: error.response.data.message };
  }
}
