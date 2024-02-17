const categoryItems = [
  {
    id: 1,
    title: "Design",
    description: "(68 items)",
    image: "https://www.mydixi.com/wp-content/uploads/2021/02/UIUX.jpg"
  },
  {
    id: 2,
    title: "Developer",
    description: "(48 items)",
    image: "https://miro.medium.com/v2/resize:fit:600/1*uHlx-j01g5ybkJ2d_8dtyQ.png"
  },
  {
    id: 3,
    title: "Business",
    description: "(12 items)",
    image: "https://www.quickserv.co.th/products/update/20190418-030516-solution.png"
  },
  {
    id: 4,
    title: "Data",
    description: "(255 items)",
    image: "https://images.shiksha.com/mediadata/shikshaOnline/mailers/2021/naukri-learning/oct/28oct/What-is-Data-Analysis.jpg"
  },
]

const Categories = () => {
  return (
    <div className='section-container py-16 '>
      <div className='text-center'>
        <p className='subtitle'>Customer Favorite</p>
        <h1 className=' title'>Popular Categories</h1>
      </div>
      <div className='flex flex-col sm:flex-row flex-warp gap-6 justify-around items-center mt-12'>
        {categoryItems.map((item) => (
          <div key={item.id} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300'>
            <div className='w-full mx-auto flex items-center justify-center'>
              <img src={item.image} alt="" className='bg-red p-2 rounded-full w-28 h-28' />
            </div>
            <div className='mt-5 space-y-1'>
              <h5 className='text-[#1E1E1E] font-semibold'>{item.title}</h5>
              <p className='text-secondary text-sm'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories