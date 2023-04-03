import { useEffect, useState } from 'react'
import ModalRegister from './components/modal/ModalRegister'
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
  Select
} from '@chakra-ui/react'
import './assets/css/global.css'

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState([])
  const [dataEdit, setDataEdit] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  })

  useEffect(() => {
    const db_costumer = localStorage.getItem('contact_register')
      ? JSON.parse(localStorage.getItem('contact_register'))
      : []

    setData(db_costumer)
  }, [setData])

  const handleRemove = (phone) => {
    const newArray = data.filter((item) => item.phone !== phone)

    setData(newArray)

    localStorage.setItem('contact_register', JSON.stringify(newArray))
  }

  const names = [...new Set(data.map((item) => item.name))]

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )


  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="Arial"
    >

      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>

        <div className="flex-direction">
          <h1 className="font-title">Gerenciador de Contatos</h1>
          <div>
            <Button leftIcon={<AddIcon />} colorScheme="red" onClick={() => [setDataEdit({}), onOpen()]}>
              NOVO CADASTRO
            </Button>
          </div>
        </div>

        <Box mt="6">
          <Select
            placeholder="Filtrar por nome"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          >
            <option value="">Todos</option>
            {names.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </Box>

        <Box overflowX="auto" overflowY="auto" className="card-contact" pb={10}>
          <Table size='sm' mt="6" whiteSpace="nowrap">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="16px" whiteSpace="nowrap">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="16px" whiteSpace="nowrap">
                  E-Mail
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="16px" whiteSpace="nowrap">
                  Telefone
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.map(({ name, email, phone }, index) => (
                <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                  <Td minWidth="100px" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>{name}</Td>
                  <Td minWidth="100px" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>{email}</Td>
                  <Td minWidth="100px" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>{phone}</Td>
                  <Td px={5}>
                    <EditIcon
                      fontSize={16}
                      color='green.500'
                      onClick={() => [
                        setDataEdit({ name, email, phone, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td px={5}>
                    <DeleteIcon
                      fontSize={16}
                      color='red.500'
                      onClick={() => handleRemove(phone)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalRegister
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  )
}

export default App
