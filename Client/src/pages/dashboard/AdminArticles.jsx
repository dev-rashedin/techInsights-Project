import { Helmet } from 'react-helmet-async';
import PageTitle from '../../components/PageTitle';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import AdminArticleCard from '../../components/AdminArticleCard';
import useLoadArticles from '../../hooks/useLoadArticles';
import { useEffect, useState } from 'react';
import { axiosApi } from '../../api/axiosApi';
import { useOutletContext } from 'react-router-dom';

const AdminArticles = () => {
  const [articleCount, setArticleCount] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);

  // search, sort and filter
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState('');

  const { isActive, handleToggle } = useOutletContext();

  // fetching article count
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

  // console.log(articleCount);

  // fetching all articles
  const status = '';

   const [articles, refetch, isLoading, isError, error] = useLoadArticles(
     status,
     currentPage,
     itemsPerPage,
     filter,
     search,
     sort
   );

  // console.log(articles);

  // calculating pages
  const pageNumbers = Math.ceil(articleCount?.allArticles / itemsPerPage) || 0;
  // console.log(pageNumbers)

  const pages = [...Array(pageNumbers).keys()];
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

  const handlePrevBtn = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextBtn = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // managing loading and error
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <div onClick={isActive && handleToggle}>
      <Helmet>
        <title>Tech Insights || All Articles</title>
      </Helmet>
      <PageTitle title={`All Articles`} />

      {/* select, search, sort, reset */}
      <div className='pb-12 flex flex-col md:flex-row justify-center gap-4 w-60 md:w-full mx-auto'>
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

        {/* search */}
        <form onSubmit={handleSubmit}>
          <div className='flex overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-green-lantern focus-within:ring-green-lantern'>
            <input
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              value={searchText}
              className=' placeholder-gray-500 bg-white outline-none focus:placeholder-transparent text-sm lg:text-base p-2 rounded-md'
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

        {/* sort */}
        <div>
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
        </div>
        {/* reset btn */}
        <button
          onClick={handleResetBtn}
          className='bg-white rounded-md text-sm lg:text-base px-2 py-1  border-2 border-gray-400'
        >
          Reset
        </button>
      </div>

      {/* loading all articles */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-28 mx-4 md:mx-10 lg:mx-28 xl:mx-8 mt-20'>
        {articles?.map((article) => (
          <AdminArticleCard
            key={article._id}
            article={article}
            refetch={refetch}
          />
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
          <option value='6'>6</option>
          <option value='9'>9</option>
          <option value='12'>12</option>
        </select>
      </div>
    </div>
  );
};

export default AdminArticles;
