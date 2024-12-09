import React, { useState } from 'react';
import { NativeBaseProvider, Box, VStack, HStack, Text, Image, Heading, Pressable, Divider, FlatList, Input, Button } from 'native-base';

// AppBar Component
const AppBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box>
      <HStack bg="primary.500" px="4" py="3" alignItems="center" justifyContent="space-between">
        <Text color="white" fontSize="20" fontWeight="bold">
          Recipes
        </Text>
        <Pressable 
          onPress={() => setIsMenuOpen(!isMenuOpen)} 
          onMouseEnter={() => setIsHovered(true)}  // Activar cuando el cursor está encima
          onMouseLeave={() => setIsHovered(false)} // Desactivar cuando el cursor sale
        >
          <Text color={isHovered ? "yellow.400" : "white"} fontSize="24" fontWeight="bold">
            ≡
          </Text>
        </Pressable>
      </HStack>
      {isMenuOpen && (
        <Box bg="primary.100" py="2">
          <VStack space="2" alignItems="flex-start" px="4">
            <Pressable onPress={() => alert('Go to Home')}>
              <Text fontSize="md" fontWeight="bold">Home</Text>
            </Pressable>
            <Pressable onPress={() => alert('Go to Profile')}>
              <Text fontSize="md" fontWeight="bold">Profile</Text>
            </Pressable>
            <Pressable onPress={() => alert('Go to Settings')}>
              <Text fontSize="md" fontWeight="bold">Settings</Text>
            </Pressable>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

// Recipes Cards Component
const Card = ({ name, image }) => (
  <Box bg="coolGray.100" p="4" m="2" borderRadius="8" shadow="2">
    <Image
      source={{
        uri: image,
      }}
      alt={name}
      height="150"
      borderRadius="8"
    />
    <Text mt="2" fontSize="lg" fontWeight="bold">
      {name}
    </Text>
  </Box>
);

// Swipe List Component
const SwipeList = () => (
  <FlatList
    data={[{ key: '1', name: 'Tomatoes' }, { key: '2', name: 'Garlic' }, { key: '3', name: 'Pasta' }]}
    renderItem={({ item }) => (
      <Pressable
        onPress={() => alert(`You clicked ${item.name}`)}
        onLongPress={() => alert(`Swipe action simulated for ${item.name}`)}
      >
        <Box bg="coolGray.100" p="4" my="2" borderRadius="8" shadow="1">
          <Text>{item.name}</Text>
        </Box>
      </Pressable>
    )}
    keyExtractor={(item) => item.key}
  />
);

// Footer Component
const Footer = () => (
  <Box bg="coolGray.800" p={4} alignItems="center">
    <Text color="white">© 2024 Recipes App</Text>
    <Text color="white">Contact us: info@recipesapp.com</Text>
  </Box>
);

// Login Form Component
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters long');
    } else {
      setPasswordError('');
      alert('Login successful');
    }
  };

  return (
    <Box bg="white" p="4" borderRadius="8" shadow="1" mt="4">
      <Heading size="md" mb="4">Login</Heading>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        mb="2"
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChangeText={setPassword}
        mb="2"
      />
      {passwordError && <Text color="red.500">{passwordError}</Text>}
      <Button onPress={handleLogin}>Login</Button>
    </Box>
  );
};

// Search Bar Component
const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    alert('Busqueda realizada con exito');
  };

  return (
    <HStack alignItems="center" space={2} bg="primary.200" p="3">
      <Input
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search for recipes"
        w="80%"
      />
      <Button onPress={handleSearch}>Buscar</Button>
    </HStack>
  );
};

// Main Home Component
export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const recipes = [
    { key: '1', name: 'Spaghetti Carbonara', image: '/spaghetti.jpg' },
    { key: '2', name: 'Chicken Alfredo', image: '/alfredo.jpg' },
    { key: '3', name: 'Caesar Salad', image: '/salad.jpg' },
  ];

  return (
    <NativeBaseProvider>
      <AppBar />
      <Box flex="1" p="4">
        <SearchBar />
        <Divider my="4" />
        <LoginForm />
        <Divider my="4" />
        <HStack justifyContent="space-around" bg="primary.200" p="3">
          {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, index) => (
            <Pressable key={tab} onPress={() => setActiveTab(index)}>
              <Text color={activeTab === index ? 'primary.700' : 'primary.500'} fontWeight="bold">
                {tab}
              </Text>
            </Pressable>
          ))}
        </HStack>
        <Divider my="4" />
        {activeTab === 0 && (
          <VStack>
            <Heading mb="4">Cards with Images</Heading>
            {recipes.map((recipe) => (
              <Card key={recipe.key} name={recipe.name} image={recipe.image} />
            ))}
          </VStack>
        )}
        {activeTab === 1 && (
          <VStack>
            <Heading mb="4">Swipe List</Heading>
            <SwipeList />
          </VStack>
        )}
        {activeTab === 2 && (
          <VStack>
            <Heading mb="4">Other Content</Heading>
            <Text>This is additional content for Tab 3.</Text>
          </VStack>
        )}
      </Box>
      <Footer />
    </NativeBaseProvider>
  );
}
