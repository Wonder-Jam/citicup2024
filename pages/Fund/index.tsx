import React, { useEffect, useRef } from 'react';
import styles from './index.less';
import { getFundGraph } from '@/services/ant-design-pro/api';

const data = [
  {
    roa: null,
    roe: 12.36,
    name: '平安银行股份有限公司',
    net_profit: 4551600.0,
    csrc_industry: '货币金融服务',
    security_code: '000001.SZ',
    asset_liability_ratio: 91.8316,
  },
  {
    name: '深圳平安综合金融服务有限公司',
  },
  {
    name: '平安证券股份有限公司',
  },
  {
    name: '平安健康医疗科技有限公司',
  },
  {
    name: '中国平安保险(集团)股份有限公司',
  },
  {
    name: '山东黄金矿业股份有限公司',
  },
  {
    name: '陆金所控股有限公司',
  },
  {
    name: '平安国际融资租赁有限公司',
  },
  {
    name: '中国平安人寿保险股份有限公司',
  },
  {
    name: '方正证券股份有限公司',
  },
];
const edges = [
  {
    target: '深圳平安综合金融服务有限公司',
    relations: [
      {
        currency: 'CNY',
        relationship: '同一控股公司',
        transaction_amount: null,
        transaction_method: '采购',
      },
      {
        currency: 'CNY',
        relationship: '同一控股公司',
        transaction_amount: null,
        transaction_method: '采购',
      },
    ],
  },
  {
    target: '平安证券股份有限公司',
    relations: [
      {
        currency: 'CNY',
        relationship: '同一控股公司',
        transaction_amount: null,
        transaction_method: '授信',
      },
      {
        currency: 'CNY',
        relationship: '同一控股公司',
        transaction_amount: null,
        transaction_method: '资金支持',
      },
    ],
  },
  {
    target: '平安健康医疗科技有限公司',
    relations: [
      {
        currency: 'CNY',
        relationship: '同一关键人员',
        transaction_amount: null,
        transaction_method: '签署协议',
      },
    ],
  },
  {
    target: '中国平安保险(集团)股份有限公司',
    relations: [
      {
        currency: 'CNY',
        relationship: '控股股东',
        transaction_amount: null,
        transaction_method: '存款',
      },
      {
        currency: 'CNY',
        relationship: '控股股东',
        transaction_amount: null,
        transaction_method: '授信',
      },
      {
        currency: 'CNY',
        relationship: '控股股东',
        transaction_amount: null,
        transaction_method: '存款',
      },
    ],
  },
  {
    target: '山东黄金矿业股份有限公司',
    relations: [
      {
        currency: 'CNY',
        relationship: '其他',
        transaction_amount: null,
        transaction_method: '租赁',
      },
    ],
  },
  {
    target: '陆金所控股有限公司',
    relations: [
      {
        currency: 'CNY',
        relationship: '同一控股公司',
        transaction_amount: null,
        transaction_method: '签署协议',
      },
    ],
  },
  {
    target: '平安国际融资租赁有限公司',
    relations: [
      {
        currency: 'CNY',
        relationship: '同一控股公司',
        transaction_amount: null,
        transaction_method: '授信',
      },
    ],
  },
  {
    target: '中国平安人寿保险股份有限公司',
    relations: [
      {
        currency: 'CNY',
        relationship: '同一控股公司',
        transaction_amount: null,
        transaction_method: '提供服务',
      },
    ],
  },
  {
    target: '方正证券股份有限公司',
    relations: [
      {
        currency: 'CNY',
        relationship: '同一控股公司',
        transaction_amount: null,
        transaction_method: '授信',
      },
    ],
  },
];

const Relate: React.FC = ({ companyInfo }) => {
  const graphRef = useRef<HTMLIFrameElement>(null);
  function handleIframeMessage() {}
  let securityCode = localStorage.getItem('code') || '000001.SZ';
  if (companyInfo.securityCode) {
    securityCode = companyInfo.securityCode;
    // console.log('secur in');
    // console.log(securityCode);
    // console.log(companyInfo);
  }
  // console.log("security_code");
  // console.log(companyInfo);

  useEffect(() => {
    window.addEventListener('message', handleIframeMessage);
    // 好像useEffect和iframe加载顺序不能确定，所以在组件首次挂载时监听iframe load事件执行首次渲染
    const iframe = graphRef.current;
    const handleLoad = () => {
      getFundGraph(securityCode).then((resp) => {
        // console.log('fund resp: ');
        // console.log(resp);
        iframe?.contentWindow?.postMessage(
          {
            name: 'render',
            nodes: resp.data.graph_data.nodes,
            edges: resp.data.graph_data.edges,
          },
          '*',
        );
      });
    };
    iframe?.addEventListener('load', handleLoad);
    return () => {
      iframe?.removeEventListener('load', handleLoad);
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      <iframe
        src={'/iframes/fund.html'}
        id={'equity'}
        width={'100%'}
        height={'600px'}
        ref={graphRef}
        style={{ border: 5, marginTop: 10 }}
      ></iframe>
    </div>
  );
};
export default Relate;
