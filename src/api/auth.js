import { ref, computed } from 'vue';
import axios from 'axios';

const basePath = 'https://dist.nd.ru/';

export const api = axios.create({
  baseURL: basePath,
});

export const useApi = (endpoint) => {
  const loading = ref(true);
  const data = ref();
  const error = ref();

  const errorMessage = computed(() => {
    if (error.value) {
      return error.value.message;
    }
  });

  const errorDetails = computed(() => {
    if (error.value && error.value.response) {
      return error.value.response.data.message;
    }
  });

  const errorFields = computed(() => {
    if (error.value && Array.isArray(error.value.response.data.message)) {
      return error.value.response.data.message.reduce((acc, msg) => {
        let [field] = msg.split(' ');

        if (!acc[field]) {
          acc[field] = [];
        }

        acc[field].push(msg);

        return acc;
      }, {}); // eg. { email: [ 'email is required' ] }
    }
  });

  const get = (query) => {
    loading.value = true;
    error.value = undefined;
    return api
      .get(endpoint, query)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e;
        throw e;
      })
      .finally(() => (loading.value = false));
  };

  const post = (payload) => {
    loading.value = true;
    error.value = undefined;
    return api
      .post(endpoint, payload)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e;
        throw e;
      })
      .finally(() => (loading.value = false));
  };

  return {
    loading,
    data,
    error,
    errorMessage,
    errorDetails,
    errorFields,
    get,
    post,
  };
};

export const useAuth = () => {
  const setUser = (payload) => {
    window.localStorage.setItem(AUTH_KEY, payload[AUTH_TOKEN]);
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_KEY);
    //   return Promise.resolve()
  };

  return {
    setUser,
    logout,
  };
};
