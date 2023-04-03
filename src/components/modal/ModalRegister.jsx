import { useState } from 'react'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  Box
} from '@chakra-ui/react'

const ModalRegister = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [name, setName] = useState(dataEdit.name || '')
  const [email, setEmail] = useState(dataEdit.email || '')
  const [phone, setPhone] = useState(dataEdit.phone || '')

  const handleSave = () => {
    if (!name || !email || !phone) return

    if (emailAlreadyExists()) {
      return alert("E-mail já cadastrado!")
    }

    if (phoneAlreadyExists()) {
      return alert("Telefone já cadastrado!")
    }

    if (!isEmailValid(email)) {
      return alert("E-mail inválido!")
    }

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = { name, email, phone }
    }

    const newDataArray = !Object.keys(dataEdit).length
      ? [...(data ? data : []), { name, email, phone }]
      : [...(data ? data : [])]

    localStorage.setItem('contact_register', JSON.stringify(newDataArray))

    setData(newDataArray)

    onClose()
  }

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const emailAlreadyExists = () => {
    if (dataEdit.email !== email && data?.length) {
      return data.find((item) => item.email === email)
    }

    return false
  }

  const phoneAlreadyExists = () => {
    if (dataEdit.phone !== phone && data?.length) {
      return data.find((item) => item.phone === phone)
    }

    return false
  }

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Contatos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>
                  <EmailIcon mr={1}/>E-mail
                </FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>
                <PhoneIcon mr={1} />Telefone
                </FormLabel>
                <Input
                  type="tel"
                  maxLength={11}
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => {
                    const phoneInput = e.target.value.replace(/\D/g, '')
                    setPhone(phoneInput.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'))
                  }}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default ModalRegister