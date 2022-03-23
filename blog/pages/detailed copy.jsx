import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import ReactMarkdown from 'react-markdown'
import { marked } from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'
import Tocify from '../components/tocify.tsx'
import axios from 'axios'

const Detailed = (detail) => {
  console.log(detail, 'ddddd')
  console.log(marked, '111')
  const renderer = new marked.Renderer();
  const tocify = new Tocify()
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {//高亮
      return hljs.highlightAuto(code).value;
    }
  });

  let html = marked(detail.article_content)

  return (
    <div>
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
                {detail.title}
              </div>

              <div className="list-icon center">
                <span>{detail.addTime || '-'}</span>
                <span> {detail.typeName}</span>
                {/* <span><Icon type="fire" /> 5498人</span> */}
              </div>

              <div className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}
              >
              </div>

            </div>

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>

          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />

    </div>
  )
}

Detailed.getInitialProps = async (context) => {

  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve) => {

    axios('http://127.0.0.1:7001/default/getArticleById/' + id).then(
      (res) => {
        console.log(res.data, '0000')
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}
export default Detailed