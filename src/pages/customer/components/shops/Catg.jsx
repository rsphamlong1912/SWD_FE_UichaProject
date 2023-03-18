import React from "react"

const Catg = () => {
  const data = [
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "BoBui",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "SWE",
    },
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Artist Club",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "HFWTH",
    },
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Levent",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Missout",
    },
  ]
  return (
    <>
      <div className='category'>
        <div className='chead d_flex'>
          <h1>Brands </h1>
          <h1>Shops </h1>
        </div>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
        <div className='box box2'>
          <button>View All Brands</button>
        </div>
      </div>
    </>
  )
}

export default Catg
