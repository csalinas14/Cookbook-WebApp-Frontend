import SearchBarForm from './SearchBarForm'

const Header = () => {
  return (
    <div className='bg-red-200'>
      <div className='container items-center justify-center space-y-2 px-2 py-2'>
        <div className='flex justify-center'>
          <h1 className='font-header text-5xl'>Recipe Search</h1>
        </div>
        <SearchBarForm />
      </div>
    </div>
  )
}

export default Header
