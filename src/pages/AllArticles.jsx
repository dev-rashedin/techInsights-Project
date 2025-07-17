import { Helmet } from 'react-helmet-async';
import PageTitle from '../components/PageTitle';
import useLoadArticles from '../hooks/useLoadArticles';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ArticleCard from '../components/ArticleCard';
import { useEffect, useState } from 'react';
import { axiosApi } from '../api/axiosApi';
import Button from '../components/Button';

const AllArticles = () => {
  const [articleCount, setArticleCount] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  // search, sort and filter
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState('');
  const status = 'approved';

  const [articles, refetch, isLoading, isError, error] = useLoadArticles(
    status,
    currentPage,
    itemsPerPage,
    filter,
    search,
    sort
  );

  useEffect(() => {
    fetchArticleCount();
  }, [filter, search]);

  // fetching article count
  const fetchArticleCount = async () => {
    try {
      const { data } = await axiosApi.get(
        `/articleCount?filter=${filter}&search=${search}`
      );
      setArticleCount(data);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(articleCount)

  const numberOfPages =
    Math.ceil(articleCount?.approvedArticles / itemsPerPage) || 0;
  // console.log(numberOfPages);

  const pages = [...Array(numberOfPages).keys()];

  // console.log(pages)

  // handle search
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  const handleResetBtn = () => {
    setFilter('');
    setSearchText('');
    setSort('');
    setSearch('');
  };

  // handle current page
  const handleCurrentPage = (value) => {
    setCurrentPage(value);
  };

  // handle prev and next btn
  const handlePrevBtn = () => {
    alert('Previous page clicked');
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextBtn = () => {
    alert('Next page clicked');
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // handling loading and error
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorMessage error={error} />;

  return (
    <div className='min-h-[80vh] flex flex-col justify-center'>
      <Helmet>
        <title>Tech Insights || Admin - All Articles</title>
      </Helmet>

      {/* select, search, sort, reset */}
      <div className='min-w-[350px] flex flex-col md:flex-row justify-center gap-4 w-60 md:w-full mx-auto mt-4 mb-8 xl:mb-12 '>
        {/* search */}
        <form onSubmit={handleSubmit}>
          <div className='w-full flex overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-green-lantern focus-within:ring-green-lantern'>
            <input
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              value={searchText}
              className='w-full placeholder-gray-500 bg-white outline-none focus:placeholder-transparent text-sm lg:text-base p-2 rounded-md'
              type='text'
              name='search'
              placeholder='Enter Post Title'
              aria-label='Enter Job Title'
            />

            <button
              type='submit'
              className='text-sm lg:text-base p-2  font-medium text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
            >
              Search
            </button>
          </div>
        </form>

        {/* filter and sort and reset */}
        <div className='flex gap-2 md:gap-4'>
          {/* select */}
          <select
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(0);
            }}
            value={filter}
            name='publisher'
            id='publisher'
            className='border text-sm lg:text-base px-2 py-2 md:py-0 rounded-lg font-medium'
          >
            <option value=''>Filter By Publisher</option>
            <option value='AI Revolution'>AI Revolution</option>
            <option value='Cyber Shield'>Cyber Shield</option>
            <option value='Tech Tomorrow'>Tech Tomorrow</option>
            <option value='Data Dive'>Data Dive</option>
            <option value='DevOps Digest'>DevOps Digest</option>
          </select>

          {/* sort */}

          <select
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(0);
            }}
            value={sort}
            name='category'
            id='category'
            className='border text-sm lg:text-base p-2  rounded-md w-full'
          >
            <option value=''>Sort By Posted Time</option>
            <option value='dsc'>Descending Order</option>
            <option value='asc'>Ascending Order</option>
          </select>

          {/* reset btn */}
          <button
            onClick={handleResetBtn}
            className='bg-white rounded-md text-sm lg:text-base px-2 py-1  border-2 border-gray-400'
          >
            Reset
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8 mx-8 md:mx-4 xl:mx-28'>
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} refetch={refetch} />
        ))}
      </div>

      {/* pagination */}
      <div className='flex gap-2 justify-center mt-8'>
        {/* prev btn */}

        <button
          onClick={handlePrevBtn}
          disabled={currentPage === 0}
          className={`px-4 py-2 mx-1  bg-deep-ocean
            text-pure-white
            disabled:bg-gray-600 disabled:text-gray-400 capitalize rounded-md disabled:cursor-not-allowed hover:bg-green-lantern   `}
        >
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>

            <span className='mx-1'>previous</span>
          </div>
        </button>

        {/* dynamic page */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => {
              handleCurrentPage(page);
            }}
            className={`px-4 py-1 bg-green-lantern text-white rounded-lg hover:bg-deep-ocean ${
              currentPage === page
                ? ' scale-105 -translate-y-2 bg-gradient-to-br from-green-500 to-green-700'
                : ''
            }`}
          >
            {page + 1}
          </button>
        ))}

        {/* next btn */}
        <button
          onClick={handleNextBtn}
          disabled={currentPage === pages.length - 1}
          className='px-4 py-2 mx-1  bg-deep-ocean transition-colors text-pure-white duration-300 transform rounded-md  hover:bg-green-lantern  disabled:cursor-not-allowed 
          disabled:bg-gray-600
          disabled:text-gray-400'
        >
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>

        {/* select */}
        <select
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value));
            setCurrentPage(0);
          }}
          className='pl-3 pr-1 ml-2 border-2 rounded-md border-green-lantern text-deep-ocean'
          name='itemsPerPage'
          value={itemsPerPage}
        >
          <option value='3'>3</option>
          <option value='6'>6</option>
          <option value='9'>9</option>
        </select>
      </div>
    </div>
  );
};

export default AllArticles;
