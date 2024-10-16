import axios from '@/utils/axios'


// export function login(data) {
//   return axios({
//     url: 'https://mynextpay.nextshop.dev/sur/login/backend',
//     method: 'post',
//     data,
//     isLoading: true,
//     isAlertMessage : false
//   })
// }

export async function login(payload) {
  try {
    const data = await axios({
      url: 'https://mynextpay.nextshop.dev/sur/login/backend',
      method: 'post',
      payload,
      isLoading: true,
      isAlertMessage : true
    })

    return data;
  } catch (error) {
    return {error};
  }
}
