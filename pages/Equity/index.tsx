import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.less';
import { Modal, Form, Input, Button, message } from 'antd';
import { getEquityGraph, putEquityGraph } from '@/services/ant-design-pro/api';
import { randomColorList } from '@/pages/Relate/Equity/utils/randomColor';

// 假数据
let data = {
  company_name: '万科企业股份有限公司',
  parents: [
    {
      name: '深圳市地铁集团有限公司',
      percent: 27.1800003051758,
      type: '境内国有法人',
    },
    {
      name: '香港中央结算(代理人)有限公司',
      percent: 18.4899997711182,
      type: '境外法人',
    },
    {
      name: '深圳盈嘉众实业合伙企业(有限合伙)',
      percent: 3.6800000667572,
      type: '境内一般法人',
    },
    {
      name: '香港中央结算有限公司(陆股通)',
      percent: 1.96000003814697,
      type: '境外法人',
    },
    {
      name: '中央汇金资产管理有限责任公司',
      percent: 1.54999995231628,
      type: '基金、理财产品等',
    },
    {
      name: '招商财富资管-招商银行-招商财富-招商银行-德赢1号专项资产管理计划',
      percent: 1.21000003814697,
      type: '基金、理财产品等',
    },
    {
      name: '中国人寿保险股份有限公司-传统-普通保险产品-005L-CT001沪',
      percent: 1.12999999523163,
      type: '基金、理财产品等',
    },
    {
      name: '中国证券金融股份有限公司',
      percent: 1.11000001430511,
      type: '境内一般法人',
    },
    {
      name: '深圳盈安财务顾问企业(有限合伙)',
      percent: 1.01999998092651,
      type: '境内一般法人',
    },
    {
      name: '新华人寿保险股份有限公司-分红-个人分红-018L-FH002深',
      percent: 1.00999999046326,
      type: '基金、理财产品等',
    },
  ],
  children: [
    {
      name: '海南万科企业管理有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '云南万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '芜湖万科房地产有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '合肥万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '长沙市万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '郑州万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '南京万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '大连万科置业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '中山万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '广州万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '宁波万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [
        {
          name: '宁波和崇房地产信息咨询有限公司',
          main_business: '房地产',
          percent: 0.5,
          children: [],
        },
        {
          name: '宁波明科置业有限公司',
          main_business: '房地产',
          percent: 0.495,
          children: [],
        },
      ],
    },
    {
      name: '苏州万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [
        {
          name: '苏州高新新吴置地有限公司',
          main_business: '房地产业',
          percent: 0.495,
          children: [],
        },
        {
          name: '苏州高新万阳置地有限公司',
          main_business: '房地产业',
          percent: 0.495,
          children: [],
        },
      ],
    },
    {
      name: '贵阳万科房地产有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '青岛万科房地产有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '万科(重庆)企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '烟台万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '西安万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '福州市万科发展有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '厦门市万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '太原万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '济南万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '徐州万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '扬州万科房地产有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '浙江浙南万科房地产有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '珠海万科发展有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '东莞市万科建筑技术研究有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '广西万科企业管理有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '无锡万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '上海万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [
        {
          name: '嘉兴万科房地产开发有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '南通万科企业有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '浙江万科南都房地产有限公司',
          main_business: '未知',
          percent: 0.98356164,
          children: [
            {
              name: '杭州万广置业有限公司',
              main_business: '房地产开发',
              percent: 0.5,
              children: [],
            },
          ],
        },
        {
          name: '上海合庭房地产开发有限公司',
          main_business: '房地产开发',
          percent: 0.6336,
          children: [],
        },
        {
          name: '杭州万广置业有限公司',
          main_business: '房地产开发',
          percent: 0.49178082,
          children: [],
        },
      ],
    },
    {
      name: '嘉兴万科房地产开发有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '南通万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '盐城万科房地产开发有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '兰州万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '包头万科房地产有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '哈尔滨万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '常州万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '惠州市万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '临沂万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '江门万科企业有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '珠海市泊寓公寓管理有限公司',
      main_business: '未知',
      percent: 1.0,
      children: [],
    },
    {
      name: '浙江万科南都房地产有限公司',
      main_business: '未知',
      percent: 0.98356164,
      children: [
        {
          name: '杭州万广置业有限公司',
          main_business: '房地产开发',
          percent: 0.5,
          children: [],
        },
      ],
    },
    {
      name: '万科(新疆)企业有限公司',
      main_business: '未知',
      percent: 0.95,
      children: [],
    },
    {
      name: '北京万科企业有限公司',
      main_business: '未知',
      percent: 0.95,
      children: [
        {
          name: '唐山万科房地产开发有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '石家庄万科企业有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '北京京投阳光房地产开发有限公司',
          main_business: '房地产开发,销售自行开发的商品房',
          percent: 0.51,
          children: [],
        },
        {
          name: '北京首开万科置业有限公司',
          main_business: '房地产开发',
          percent: 0.5,
          children: [],
        },
        {
          name: '北京金丰融晟投资管理有限公司',
          main_business: '投资管理',
          percent: 0.5,
          children: [],
        },
      ],
    },
    {
      name: '唐山万科房地产开发有限公司',
      main_business: '未知',
      percent: 0.95,
      children: [],
    },
    {
      name: '石家庄万科企业有限公司',
      main_business: '未知',
      percent: 0.95,
      children: [],
    },
    {
      name: '武汉市万科房地产有限公司',
      main_business: '未知',
      percent: 0.95,
      children: [],
    },
    {
      name: '长春万科房地产开发有限公司',
      main_business: '未知',
      percent: 0.95,
      children: [
        {
          name: '吉林省松花湖国际度假区开发有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
      ],
    },
    {
      name: '吉林省松花湖国际度假区开发有限公司',
      main_business: '未知',
      percent: 0.95,
      children: [],
    },
    {
      name: '沈阳万科企业有限公司',
      main_business: '未知',
      percent: 0.95,
      children: [
        {
          name: '沈阳穗港房地产投资开发有限公司',
          main_business: '房地产开发',
          percent: 0.495,
          children: [],
        },
      ],
    },
    {
      name: '深圳市万科发展有限公司',
      main_business: '未知',
      percent: 0.95,
      children: [
        {
          name: '东莞市万科房地产有限公司',
          main_business: '未知',
          percent: 0.6,
          children: [
            {
              name: '惠州市万旭房地产有限公司',
              main_business: '房地产项目开发',
              percent: 0.792,
              children: [],
            },
            {
              name: '东莞市万裕房地产有限公司',
              main_business: '房地产项目开发',
              percent: 0.792,
              children: [],
            },
            {
              name: '东莞市万珩房地产开发有限公司',
              main_business: '房地产项目开发',
              percent: 0.792,
              children: [],
            },
            {
              name: '东莞市中万宏信房地产有限公司',
              main_business: '房地产项目开发',
              percent: 0.7425,
              children: [],
            },
            {
              name: '东莞市万同房地产有限公司',
              main_business: '房地产项目开发',
              percent: 0.6435,
              children: [],
            },
            {
              name: '东莞市万科置地有限公司',
              main_business: '房地产项目开发',
              percent: 0.5,
              children: [],
            },
            {
              name: '东莞市万亨房地产有限公司',
              main_business: '房地产项目开发',
              percent: 0.3861,
              children: [],
            },
          ],
        },
        {
          name: '佛山市万科置业有限公司',
          main_business: '未知',
          percent: 0.6,
          children: [],
        },
        {
          name: '惠州市万旭房地产有限公司',
          main_business: '房地产项目开发',
          percent: 0.4752,
          children: [],
        },
        {
          name: '东莞市万裕房地产有限公司',
          main_business: '房地产项目开发',
          percent: 0.4752,
          children: [],
        },
        {
          name: '东莞市万珩房地产开发有限公司',
          main_business: '房地产项目开发',
          percent: 0.4752,
          children: [],
        },
        {
          name: '东莞市中万宏信房地产有限公司',
          main_business: '房地产项目开发',
          percent: 0.4455,
          children: [],
        },
        {
          name: '东莞市万同房地产有限公司',
          main_business: '房地产项目开发',
          percent: 0.3861,
          children: [],
        },
        {
          name: '东莞市万科置地有限公司',
          main_business: '房地产项目开发',
          percent: 0.3,
          children: [],
        },
      ],
    },
    {
      name: '万科(成都)企业有限公司',
      main_business: '未知',
      percent: 0.9,
      children: [
        {
          name: '成都万新置业有限公司',
          main_business: '房地产开发',
          percent: 0.495,
          children: [],
        },
      ],
    },
    {
      name: '环山集团股份有限公司',
      main_business: '未知',
      percent: 0.88937615,
      children: [],
    },
    {
      name: '天津万科房地产有限公司',
      main_business: '未知',
      percent: 0.85,
      children: [],
    },
    {
      name: '万科物流发展有限公司',
      main_business: '未知',
      percent: 0.81622579,
      children: [],
    },
    {
      name: '上海合庭房地产开发有限公司',
      main_business: '房地产开发',
      percent: 0.6336,
      children: [],
    },
    {
      name: '东莞市万科房地产有限公司',
      main_business: '未知',
      percent: 0.57,
      children: [
        {
          name: '惠州市万旭房地产有限公司',
          main_business: '房地产项目开发',
          percent: 0.792,
          children: [],
        },
        {
          name: '东莞市万裕房地产有限公司',
          main_business: '房地产项目开发',
          percent: 0.792,
          children: [],
        },
        {
          name: '东莞市万珩房地产开发有限公司',
          main_business: '房地产项目开发',
          percent: 0.792,
          children: [],
        },
        {
          name: '东莞市中万宏信房地产有限公司',
          main_business: '房地产项目开发',
          percent: 0.7425,
          children: [],
        },
        {
          name: '东莞市万同房地产有限公司',
          main_business: '房地产项目开发',
          percent: 0.6435,
          children: [],
        },
        {
          name: '东莞市万科置地有限公司',
          main_business: '房地产项目开发',
          percent: 0.5,
          children: [],
        },
        {
          name: '东莞市万亨房地产有限公司',
          main_business: '房地产项目开发',
          percent: 0.3861,
          children: [],
        },
      ],
    },
    {
      name: '佛山市万科置业有限公司',
      main_business: '未知',
      percent: 0.57,
      children: [],
    },
    {
      name: '万物云空间科技服务股份有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [
        {
          name: '深圳市万睿智能科技有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '福建伯恩物业集团有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '上海万科物业服务有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '成都万科物业服务有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '武汉市万科物业服务有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '长春万科物业服务有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '沈阳万科物业服务有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '广州市万科物业服务有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '北京万科物业服务有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '南京万科物业管理有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '东莞市万科物业服务有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '佛山市万科物业服务有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '深圳市万科物业服务有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '天津万科物业服务有限公司',
          main_business: '未知',
          percent: 1.0,
          children: [],
        },
        {
          name: '上海阳光智博生活服务集团有限公司',
          main_business: '未知',
          percent: 0.99999,
          children: [],
        },
      ],
    },
    {
      name: '深圳市万睿智能科技有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [],
    },
    {
      name: '福建伯恩物业集团有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [],
    },
    {
      name: '上海万科物业服务有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [],
    },
    {
      name: '成都万科物业服务有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [],
    },
    {
      name: '武汉市万科物业服务有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [],
    },
    {
      name: '长春万科物业服务有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [],
    },
    {
      name: '沈阳万科物业服务有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [],
    },
    {
      name: '广州市万科物业服务有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [],
    },
    {
      name: '北京万科物业服务有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [],
    },
    {
      name: '南京万科物业管理有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [],
    },
    {
      name: '东莞市万科物业服务有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [],
    },
    {
      name: '佛山市万科物业服务有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [],
    },
    {
      name: '深圳市万科物业服务有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [],
    },
    {
      name: '天津万科物业服务有限公司',
      main_business: '未知',
      percent: 0.5091,
      children: [],
    },
    {
      name: '上海阳光智博生活服务集团有限公司',
      main_business: '未知',
      percent: 0.5090949,
      children: [],
    },
    {
      name: '宁波和崇房地产信息咨询有限公司',
      main_business: '房地产',
      percent: 0.5,
      children: [],
    },
    {
      name: '上海万九绿合置业有限公司',
      main_business: '房地产开发',
      percent: 0.5,
      children: [],
    },
    {
      name: '江西万科益达置业投资有限公司',
      main_business: '未知',
      percent: 0.5,
      children: [],
    },
    {
      name: '宁波明科置业有限公司',
      main_business: '房地产',
      percent: 0.495,
      children: [],
    },
    {
      name: '苏州高新新吴置地有限公司',
      main_business: '房地产业',
      percent: 0.495,
      children: [],
    },
    {
      name: '苏州高新万阳置地有限公司',
      main_business: '房地产业',
      percent: 0.495,
      children: [],
    },
    {
      name: '杭州万广置业有限公司',
      main_business: '房地产开发',
      percent: 0.49178082,
      children: [],
    },
    {
      name: '北京京投阳光房地产开发有限公司',
      main_business: '房地产开发,销售自行开发的商品房',
      percent: 0.4845,
      children: [],
    },
    {
      name: '北京首开万科置业有限公司',
      main_business: '房地产开发',
      percent: 0.475,
      children: [],
    },
    {
      name: '北京金丰融晟投资管理有限公司',
      main_business: '投资管理',
      percent: 0.475,
      children: [],
    },
    {
      name: '沈阳穗港房地产投资开发有限公司',
      main_business: '房地产开发',
      percent: 0.47025,
      children: [],
    },
    {
      name: '惠州市万旭房地产有限公司',
      main_business: '房地产项目开发',
      percent: 0.45144,
      children: [],
    },
    {
      name: '东莞市万裕房地产有限公司',
      main_business: '房地产项目开发',
      percent: 0.45144,
      children: [],
    },
    {
      name: '东莞市万珩房地产开发有限公司',
      main_business: '房地产项目开发',
      percent: 0.45144,
      children: [],
    },
    {
      name: '成都万新置业有限公司',
      main_business: '房地产开发',
      percent: 0.4455,
      children: [],
    },
    {
      name: '东莞市中万宏信房地产有限公司',
      main_business: '房地产项目开发',
      percent: 0.423225,
      children: [],
    },
    {
      name: '东莞市万同房地产有限公司',
      main_business: '房地产项目开发',
      percent: 0.366795,
      children: [],
    },
    {
      name: '东莞市万科置地有限公司',
      main_business: '房地产项目开发',
      percent: 0.285,
      children: [],
    },
    {
      name: '东莞市万亨房地产有限公司',
      main_business: '房地产项目开发',
      percent: 0.220077,
      children: [],
    },
  ],
};

// @ts-ignore
const Equity: React.FC = ({ companyInfo, isEditing, onChangeModal, onChangeEdit, setChildRef }) => {
  const treeRef = useRef(null);

  let company_name = '平安银行股份有限公司';
  company_name =
    companyInfo.companyName || localStorage.getItem('object') || '平安银行股份有限公司';

  function getBusinessMap(data: API.EquityGraphResponse) {
    const map: Map<string, string> = new Map();
    const children = data.graph_data.children;
    function deepFind(child: API.EquityGraphChild) {
      if (!map.has(child.main_business)) {
        map.set(child.main_business, '#ffffff');
      }
      if (child.children.length === 0) {
        return;
      } else {
        for (const c of child.children) {
          deepFind(c);
        }
      }
    }
    for (const child of children) {
      deepFind(child);
    }
    const len: number = map.size;
    const colorList = randomColorList(len);
    let i = 0;
    for (const [key, _] of map) {
      map.set(key, colorList[i++]);
    }

    map.set('未知', '#ffffff');
    return map;
  }

  const handleIframeMessage = (event: any) => {
    // 处理来自iframe的消息
    // console.log('Message received from iframe:', event.data);
    switch (event.data.name) {
      case 'save':
        handleReciveSave(event.data);
        break;
      case 'addChild':
        handleAddChild();
        break;
      case 'addParent':
        handleAddParent();
        break;
      default:
        break;
    }
  };

  function handleAddParent() {
    // setIsModalOpen([true, 0]);
    onChangeModal([true, 0]);
  }

  function handleAddChild() {
    // setIsModalOpen([true, 1]);
    onChangeModal([true, 1]);
  }

  function handleReciveSave(e: any) {
    data = e.content;
    // TODO: 把data传到后端
    // console.log('saveData: ');
    // console.log(data);
    putEquityGraph(company_name, data)
      .then(() => {
        onChangeEdit(false);
        alert('保存成功，请刷新');
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    const iframe = treeRef.current;
    if (!iframe) return;
    getEquityGraph(company_name)
      .then((resp) => {
        iframe?.contentWindow?.postMessage(
          {
            name: 'render',
            content: isEditing,
            treeData: resp.data.graph_data,
            businessMap: getBusinessMap(resp.data),
            securityCode: companyInfo.securityCode || localStorage.getItem('code'),
          },
          '*',
        );
      })
      .catch((error) => {
        console.error('Error fetching equity graph:', error);
      });
  }, [isEditing]);

  useEffect(() => {
    window.addEventListener('message', handleIframeMessage);
    // 好像useEffect和iframe加载顺序不能确定，所以在组件首次挂载时监听iframe load事件执行首次渲染
    const iframe = treeRef.current;
    setChildRef(iframe);
    const handleLoad = () => {
      getEquityGraph(company_name)
        .then((resp) => {
          // 使用 data 来发送消息
          // console.log('get finished: ');
          // console.log(resp.data);
          iframe?.contentWindow?.postMessage(
            {
              name: 'render',
              content: isEditing,
              treeData: resp.data.graph_data,
              businessMap: getBusinessMap(resp.data),
              securityCode: companyInfo.securityCode || localStorage.getItem('code'),
            },
            '*',
          );
        })
        .catch((error) => {
          console.error('Error fetching equity graph:', error);
        });
    };
    iframe?.addEventListener('load', handleLoad);
    return () => {
      iframe?.removeEventListener('load', handleLoad);
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  return (
    <iframe
      src={'/iframes/equity.html'}
      id={'equity'}
      ref={treeRef}
      width={'100%'}
      height={'600px'}
      style={{ border: 5, marginTop: 10 }}
    ></iframe>
  );
};

const Relate: React.FC = ({ companyInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  // 对话框：
  const [isModalOpen, setIsModalOpen] = useState([false, 0]);
  const [form] = Form.useForm();

  const childRef = useRef(null);
  const setChildRef = (ref) => {
    childRef.current = ref;
  };

  function handleSaveSend() {
    // TODO: 传给equity组件中的iframe
    childRef?.current?.contentWindow?.postMessage({ name: 'save' }, '*');
    setIsEditing(false);
  }

  const handleOk = () => {
    setIsModalOpen([false, isModalOpen[1]]);
    const values = form.getFieldsValue();
    const content = { ...values };
    let name: string = 'addParent';
    if (isModalOpen[1] === 1) {
      content.children = [];
      name = 'addChild';
      content.percent = parseFloat(content.percent);
    } else {
      content.percent = parseFloat(content.percentage);
    }
    // console.log(content);
    // TODO: 同样传信息给iframe
    childRef?.current?.contentWindow?.postMessage(
      {
        name: name,
        content: content,
      },
      '*',
    );
  };

  const memoEquity = useMemo(
    () => (
      <Equity
        test="test"
        companyInfo={companyInfo}
        isEditing={isEditing}
        onChangeModal={(params: (number | boolean)[]) => setIsModalOpen(params)}
        onChangeEdit={(isEdit: boolean) => setIsEditing(isEdit)}
        setChildRef={setChildRef}
      />
    ),
    [isEditing],
  );

  return (
    <div className={styles.mainContainer}>
      <Button type="primary" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? '取消' : '编辑'}
      </Button>
      <Button type="primary" disabled={!isEditing} onClick={handleSaveSend}>
        保存
      </Button>
      {memoEquity}
      <Modal
        title="添加"
        open={isModalOpen[0]}
        onOk={handleOk}
        onCancel={() => setIsModalOpen([false, 0])}
      >
        <Form form={form}>
          <Form.Item
            name="name"
            label="公司名称"
            rules={[{ required: true, message: '请输入公司名称' }]}
          >
            <Input />
          </Form.Item>
          {isModalOpen[1] === 1 && (
            <>
              <Form.Item
                name="percent"
                label="控股比例((0,1])"
                rules={[{ required: true, message: '请输入控股比例' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="main_business"
                label="业务单元"
                rules={[{ required: true, message: '请输入业务单元' }]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          {isModalOpen[1] === 0 && (
            <>
              <Form.Item
                name="percentage"
                label="控股比例(%)"
                rules={[{ required: true, message: '请输入控股比例' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="type"
                label="实体类型"
                rules={[{ required: true, message: '请输入实体类型' }]}
              >
                <Input />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Relate;
