import React, { useState } from "react";
import { Container, VStack, Textarea, Button, Table, Thead, Tbody, Tr, Th, Td, Box, Text } from "@chakra-ui/react";

const Index = () => {
  const [inputData, setInputData] = useState("");
  const [tables, setTables] = useState([]);

  const handleDataInput = (e) => {
    setInputData(e.target.value);
  };

  const parseDataToTables = () => {
    const rows = inputData.split("\n");
    const newTables = [];
    let currentTable = [];

    rows.forEach((row) => {
      if (row.trim() === "") {
        if (currentTable.length > 0) {
          newTables.push(currentTable);
          currentTable = [];
        }
      } else {
        currentTable.push(row.split(",").map((cell) => cell.trim()));
      }
    });

    if (currentTable.length > 0) {
      newTables.push(currentTable);
    }

    setTables(newTables);
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing={4} my={8}>
        <Text fontSize="2xl" fontWeight="bold">
          Data Table Splitter
        </Text>
        <Textarea placeholder="Enter data here, rows separated by new lines and columns by commas. Use empty lines to separate tables." value={inputData} onChange={handleDataInput} size="lg" height="200px" />
        <Button colorScheme="blue" onClick={parseDataToTables}>
          Generate Tables
        </Button>
        {tables.map((table, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} width="full">
            <Text fontWeight="bold">Table {index + 1}</Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {table[0].map((header, idx) => (
                    <Th key={idx}>{header}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {table.slice(1).map((row, idx) => (
                  <Tr key={idx}>
                    {row.map((cell, index) => (
                      <Td key={index}>{cell}</Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
