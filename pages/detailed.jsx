import React,{useState} from 'react'
import Head from 'next/head'
import {Row, Col , Icon ,Breadcrumb  } from 'antd'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'

const Detailed = () => {
  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>生活</Breadcrumb.Item>
                  <Breadcrumb.Item>随笔</Breadcrumb.Item>
                </Breadcrumb>
              </div>

             <div>
                <div className="detailed-title">
                 3.18随笔
                </div>

                <div className="list-icon center">
                  <span><Icon type="calendar" /> 2022-03-18</span>
                  <span><Icon type="folder" /> 生活</span>
                  {/* <span><Icon type="fire" /> 5498人</span> */}
                </div>

                <div className="detailed-content" >
                  下雪了
                </div>

             </div>

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />

        </Col>
      </Row>
      <Footer/>

   </>
  )
  }

export default Detailed