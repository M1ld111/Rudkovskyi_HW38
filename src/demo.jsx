import React, {useState, useRef, useEffect} from 'react';
import './index.css';
import {Button, Tabs, Table, Calendar, Carousel} from 'antd';

// const contentGenerationTemplate = { //
//   title: '',
//   body: '',
//   author: ''
// }

const defaultTabs = new Array(5).fill(null).map((_, index) => {
  const id = String(index + 1);
  return {
    label: `Tab ${id}`,
    children: `Контент який знаходиться у цій вкладці ${index + 1}`,
    key: id,
  }
});

const App = () => {
  const [activeKey, setActiveKey] = useState(defaultTabs[0].key);
  const [items, setItems] = useState(defaultTabs);
  const newTabIndex = useRef(0);

  const onChange = (key) => {
    setActiveKey(key);
  }

  const [columns, setColumns] = useState([
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Quote',
      dataIndex: 'quote',
    },
    {
      title: 'Author',
      dataIndex: 'author',
    }
  ])

  const [dataSource, setDataSource] = useState([])

  useEffect(()=>{
    fetch('https://dummyjson.com/quotes')
    .then(res => res.json())
    .then((result) => {
      setDataSource(result.quotes)
    });
  }, [])


  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`

    setItems([
      ...items,
      { label: 'Нова вкладка', 
      children: <div>
                  <div style={{display:'flex'}}>
                    <Calendar style={{width:"50%"}} />
                    <div style={{height:"300px", width:"300px", background:"lightGrey"}}>
                     <Carousel 
                     autoplay 
                     pauseOnHover={true} 
                     draggable
                     style={{height:"300px", width:"300px"}}
                     >
                      <div style={{}}>
                        <h2 style={{margin:"0", color:"white", textAlign:"center", lineHeight:"250px", backgroundColor:"pink"}}>Slide1</h2>
                      </div>
                      <div >
                        <h2 style={{margin:"0", color:"white", textAlign:"center", lineHeight:"250px", backgroundColor:"purple"}}>Slide2</h2>
                      </div>
                      <div >
                        <h2 style={{margin:"0", color:"white", textAlign:"center", lineHeight:"250px", backgroundColor:"lightBlue"}}>Slide3</h2>
                      </div>
                      <div >
                        <h2 style={{margin:"0", color:"white", textAlign:"center", lineHeight:"250px", backgroundColor:"blue"}}>Slide4</h2>
                      </div>
                      <div >
                        <h2 style={{margin:"0", color:"white", textAlign:"center", lineHeight:"250px", backgroundColor:"yellow"}}>Slide5</h2>
                      </div>
                     </Carousel>
                    </div>
                  </div>
                  <Table columns={columns} dataSource={dataSource} scroll={{y: 300}}/>
              </div>
      , 
      key: newActiveKey}
    ])
    setActiveKey(newActiveKey);
  }

  const remove = (tabKey) => {
    const keyIndex = items.findIndex((tab) => tab.key === tabKey);
    const newTabs = items.filter((tab) => tab.key !== tabKey);
    if(newTabs.length && tabKey === activeKey){
      const { key } = newTabs[keyIndex === newTabs.length ? keyIndex - 1 : keyIndex]
      setActiveKey(key);
    }
    setItems(newTabs);
  }

  const onEdit = (tabKey, action) => {
    if(action === 'add') {
      add();
    } else {
      remove(tabKey);
    }
  }


  return(
    <div style={{width: '100%'}}>
      <div style={{ marginBottom: 15}}>
        <Button onClick={add}>
          Додати вкладку
        </Button>
      </div>

      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={items}
      />
    </div>
  )
}

export {
  App as Demo
}
