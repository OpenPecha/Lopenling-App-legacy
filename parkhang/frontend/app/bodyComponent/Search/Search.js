import React from 'react'
import styles from './Search.css'
import Tab from '../utility/Tab'


function Search(props) {

const {searchTerm} =props
const tabContent =[{
  title:'Sources',
  count:21
},
{
  title:'Sheets',
  count:3
},
{
  title:'fulltexts',
  count:4
}];
const searchCount=10;
  return (
    <div className={styles.SearchContainer}>
      <div className={styles.LeftSearch}>
      <div className={styles.SearchTitle}>Results for: {searchTerm}</div>
      <div className={styles.SearchCount}>{searchCount} Results found</div>

      <Tab active={0}>
                {tabContent.map((tab, idx) => (
                    <Tab.TabPane key={`Tab-${idx}`} tab={tab.title} count={tab.count}>
                       
                    </Tab.TabPane>
                ))}
            </Tab>
      </div>
    <div className={styles.RightSearch}>
       <h2>
         <span>Topics</span></h2>
         <ul>
           
           <li><input type='checkbox'/><span>Chojuk</span></li>
           <li><input type='checkbox'/><span>Chojuk</span></li>
           <li><input type='checkbox'/><span>Chojuk</span></li>
         </ul>
    </div>
    </div>
  )
}

export default Search