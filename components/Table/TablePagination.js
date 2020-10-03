import { useState, useEffect } from 'react'


const TablePagination = ({ totalUsersCount, currentPage, setCurrentPage, limit }) => {

  const PageNumber = ({ active, children }) => {
    return (
      <a href="#" className={`${active ? 'bg-primary font-bold text-white' : 'bg-white font-medium text-gray-700 hover:bg-gray-50'} -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 focus:outline-none`}>
        {children}
      </a>
    )
  }

  const [pagesToRender, setPagesToRender] = useState(null)

  useEffect(() => {
    if (totalUsersCount) {
      var totalNumberOfPages = Math.ceil(totalUsersCount / limit)

      var pagesArray = []
      for (var i = 1; i <= totalNumberOfPages; i++) {
        pagesArray.push(i)
      }
      pagesToRender || setPagesToRender(pagesArray)
    }
  }, [totalUsersCount, pagesToRender])


  return (
    pagesToRender ?
      <tr>
        <td colSpan={100}>
          <div className="bg-white px-4 py-3 flex items-center justify-between sm:px-6">
            <div className="block sm:flex-1 sm:flex items-center justify-between">
              <div>
                <p className="text-sm leading-5 text-gray-700">
                  Showing
                  {' '}
                  <span className="font-bold">{(limit * (currentPage - 1)) + 1}</span>
                  {' '}
                  to
                  {' '}
                  <span className="font-bold">{limit * currentPage}</span>
                  {' '}
                  of
                  {' '}
                  <span className="font-bold">{totalUsersCount}</span>
                  {' '}
                  results
                </p>
              </div>
              <div className='mt-2 sm:mt-0'>
                <nav className="relative z-0 inline-flex shadow-sm">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Previous">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  {
                    pagesToRender.map(value => {
                      return (
                        <PageNumber active={currentPage === value} key={value}>
                          {value}
                        </PageNumber>
                      )
                    })
                  }
                  <PageNumber active={true}>
                    1
                  </PageNumber>
                  <PageNumber active={false}>
                    2
                  </PageNumber>
                  <PageNumber active={false}>
                    3
                  </PageNumber>
                  <span className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
                    ...
                </span>
                  <PageNumber active={false}>
                    8
                </PageNumber>
                  <PageNumber active={false}>
                    9
                </PageNumber>
                  <PageNumber active={false}>
                    10
                </PageNumber>
                  <a href="#" className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </td>
      </tr> : <tr></tr>
  )
}

export default TablePagination