import React, { useState } from 'react'
import servicePath from '../config/apiUrl'
import Head from 'next/head'
import {
  FireOutlined,
  FireTwoTone,
  CalendarTwoTone,
  FolderTwoTone
} from '@ant-design/icons';
import '../static/style/pages/index.css'
import { Row, Col, List } from 'antd'
import axios from 'axios'
import Header from '../components/Header.jsx'
import Author from '../components/Author.jsx'
import Advert from '../components/Advert.jsx'
import Footer from '../components/Footer.jsx'
import Link from 'next/link'
import {marked} from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
const Home = (list) => {
  const [mylist, setMylist] = useState(
    list.data
  )
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 
  // mylist.forEach(item => {
  //   if (item.addTime) {
  //     item.addTime = item.addTime.slice(0, 10)
  //   }
  // })
  return (

    <div>
      <Head>
        <title>She came,her face half hid behind a pipa still</title>
      </Head>
      <Header />
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarTwoTone /> {item.addTime || '-'}</span>
                  <span><FolderTwoTone /> {item.typeName || '-'}</span>
                  <span><FireTwoTone /> {item.view_count || 0}人</span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{__html:marked(item.introduce||'--')}}></div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}
Home.getInitialProps = async () => {
  // const promise = new Promise((resolve) => {
  //   axios('http://127.0.0.1:7001/default/getArticleList').then(
  //     res => {
  //       console.log('远程获取数据结果:', res.data.data)
  //       resolve(res.data)
  //     }
  //   )
  // })

  // return await promise
  return await axios(servicePath.getArticleList).then(res => {
    console.log('-----',res.data,'aaaaa');
    return res.data
  })
}
export default Home