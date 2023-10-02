import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from '../redux/store.js';
import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/globals.css'
import Layout from "@/components/layout/Layout"
// import 'bootstrap/dist/js/bootstrap.js';

import type { AppProps } from 'next/app'
import useRedirectLoggedOutUser from '@/customHook/useRedirectLoggedOutUser.js';

export default function App({ Component, pageProps }: AppProps) {
  // console.log(pageProps);
  return(
  <>
    <Provider store={store}>
      <Template Comp={Component} Props={...pageProps} />
    </Provider>
  </>
  )
}
interface Props {
  Comp:any,
  Props:any
}
function Template({ Comp, Props }: Props) {
  useRedirectLoggedOutUser("/auth/login");
  return(
  <>
    <ToastContainer/>
    <Layout>
      <Comp {...Props} />
    </Layout>
    <div id='loader'/>
  </>
  )
}

