// import React, { FC, useEffect } from 'react';
// import { Result, ActivityIndicator } from 'antd-mobile';
// import useRequest from '@umijs/use-request';
// import { axios } from 'api';
// import { UserManager, User } from 'oidc';
// import { closePage } from 'jcsscii';
// import { ReactComponent as WarnIcon } from './assets/svg/warn.svg';

// const mgr = new UserManager();

// // 测试环境 206是212环境的映射
// // http://192.10.169.206:6080/ 短token获取地址
// // http://localhost:3200/authorize?token=20f60335-b829-4401-8521-e999a5c75339&redirect_uri=%2Fapp%2F392be5fd62214fc59c6410cc78153a57%2Fflow%2Fa66374692ccbb48fc868e89c4ff63a1cf
// // https://example.com/authorize?token={TOKEN}&redirect_uri={REDIRECT_URI}&type=1
// // REDIRECT_URI=UrlEncode(REDIRECT_URI)
// // 从应用站点进入 h5 页面
// // http://localhost:3400/authorize?token=3959d8f9-9d1d-43f4-8cb9-52dd36c89c61&type=1&redirect_uri=/

// // https://oms.cssccloud.net/forlabor-h5/authorize?access_token=27a2cc3c-2524-4a92-9fbc-143e27b93594&type=1&redirect_uri=https%3A%2F%2Foms.cssccloud.net%2Fforlabor-h5%2FgetPersonData

// // 新建应用地址
// // https://oms.cssccloud.net/businessvehicle-h5/authorize?code={token}&redirect_uri=/businessvehicle-h5/home

// // https://qyzd.cssccloud.net/api/qyzd/app_manage/visit?appId=10c95095-5cdf-434a-b0f7-7cbbfea5c0a2&token=ae914905-e61f-492d-b802-e64141632684

// interface IParams {
//   code?: string;
//   redirect_uri?: string;
//   [k: string]: string | undefined;
// }

// function token2AccessToken(params: IParams) {
//   // console.log('params', params);
//   const { code } = params;
//   return axios({
//     baseURL: CONFIG.API_BASE_URL,
//     url: '/uaa/api/user/token_to_accessToken',
//     params: { token: code, type: params.type || 1 },
//   }).then((resp: any) => {
//     // 因为直接返回token 没有code,currentTime, data,message
//     if (!resp.data.access_token) return Promise.reject('无法获取token');
//     // 成功获取 access_token, 获取用户信息
//     const data = resp.data;
//     return axios({
//       baseURL: CONFIG.API_BASE_URL,
//       url: '/his-omp/api/employee/currentEmp',
//       headers: { Authorization: `${data.token_type} ${data.access_token}` },
//     }).then(async (response: any) => {
//       console.log('login:fetch current user', response.data.data);
//       const profile = response.data.data;
//       const user = new User({ ...data, profile });
//       await mgr.storeUser(user);
//       return mgr.getUser();
//     });
//   },err=>{
//     return Promise.reject('请求接口失败,接口无返回');
//   });
// }

// const getParamsFromUrl = (): IParams => {
//   if (window.location.search.length < 2) return {};

//   const query = window.location.search
//     .slice(1)
//     .split('&')
//     .map(function (m) {
//       return m.split('=');
//     })
//     .reduce(function (prev: any, [k, v]) {
//       return { ...prev, [k]: v };
//     }, {});

//   return { ...query, code: query.code || query.access_token };
// };

// const Authorize: FC<any> = () => {
//   const { loading, run: login, error } = useRequest((t: IParams) => token2AccessToken(t), {
//     manual: true,
//     onSuccess: () => {
//       // 登录成功后 跳转到 目标地址
//       const { redirect_uri } = getParamsFromUrl();
//       window.location.href = redirect_uri ? decodeURIComponent(redirect_uri) : '/';
//     },
//   });

//   useEffect(() => {
//     login(getParamsFromUrl());
//   }, [login]);

//   // console.log(error);

//   // 登录发生错误
//   if (error) {
//     return (
//       <Result
//         style={{ paddingTop: 48, height: '48vh', boxSizing: 'border-box', marginTop: 64 }}
//         img={<WarnIcon fontSize={64} />}
//         title='登录错误'
//         message={error || '发生网络错误'}
//         buttonText='关闭页面'
//         buttonType='ghost'
//         onButtonClick={() => {
//           closePage();
//         }}
//       />
//     );
//   }

//   return <>{loading && <ActivityIndicator toast text='登录中...' />}</>;
// };

// export default Authorize;
