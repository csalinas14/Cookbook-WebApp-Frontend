import SearchBarForm from './SearchBarForm'

const Header = () => {
  return (
    <div className='bg-red-200'>
      <div className='container mx-auto max-w-lg items-center justify-center space-y-2 px-2 py-8'>
        <div className='flex justify-center'>
          <h1 className='font-header text-5xl md:text-7xl'>Recipe Search</h1>
        </div>
        <SearchBarForm />
      </div>
    </div>
  )
}

export default Header
