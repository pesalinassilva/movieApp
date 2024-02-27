import Pagination from 'react-bootstrap/Pagination'

const PaginationContent = () => {
    const handlePage = (data) => {
        console.log(data)
    }
    
    return (
        <Pagination onClick={handlePage}>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
    )
}

export default PaginationContent;