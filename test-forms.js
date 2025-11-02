// Test script to verify login/signup functionality
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_URL = 'http://localhost:8000';

async function testForms() {
  console.log('🧪 Testing Social App Forms...\n');

  // Test 1: Test signup
  console.log('1️⃣ Testing Signup...');
  const testUser = {
    username: `testuser${Date.now()}`,
    email: `test${Date.now()}@example.com`,
    password: 'testpassword123',
    city: 'Test City',
    age: 25
  };

  try {
    const signupResponse = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(testUser).toString(),
      redirect: 'manual' // Don't follow redirects
    });

    console.log('Signup Status:', signupResponse.status);
    console.log('Signup Headers:', signupResponse.headers.get('location'));
    
    if (signupResponse.status === 302) {
      console.log('✅ Signup successful - redirected to login');
    } else {
      console.log('❌ Signup failed');
      const text = await signupResponse.text();
      console.log('Response:', text.substring(0, 200));
    }

    // Test 2: Test login
    console.log('\n2️⃣ Testing Login...');
    const loginResponse = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username: testUser.username,
        password: testUser.password
      }).toString(),
      redirect: 'manual'
    });

    console.log('Login Status:', loginResponse.status);
    console.log('Login Headers:', loginResponse.headers.get('location'));
    
    if (loginResponse.status === 302) {
      console.log('✅ Login successful - redirected to profile');
    } else {
      console.log('❌ Login failed');
      const text = await loginResponse.text();
      console.log('Response:', text.substring(0, 200));
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎉 Form tests completed!');
}

// Run the tests
testForms().catch(console.error);