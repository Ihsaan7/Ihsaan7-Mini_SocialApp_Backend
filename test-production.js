// Test script to verify production deployment
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const PROD_URL = 'https://mini-social-mtyt75nnw-egzziwd-8640s-projects.vercel.app';

async function testProduction() {
  console.log('🧪 Testing Production Deployment...\n');
  console.log('🌐 URL:', PROD_URL);

  // Test 1: Health check
  console.log('\n1️⃣ Testing API Health...');
  try {
    const response = await fetch(PROD_URL);
    console.log('Status:', response.status);
    if (response.status === 200) {
      console.log('✅ Production site is accessible');
    } else {
      console.log('❌ Production site returned:', response.status);
    }
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return;
  }

  // Test 2: Test signup page
  console.log('\n2️⃣ Testing Signup Page...');
  try {
    const response = await fetch(PROD_URL);
    const html = await response.text();
    if (html.includes('Create your account')) {
      console.log('✅ Signup page loads correctly');
    } else {
      console.log('❌ Signup page content not found');
    }
  } catch (error) {
    console.error('❌ Signup page test failed:', error.message);
  }

  // Test 3: Test login page
  console.log('\n3️⃣ Testing Login Page...');
  try {
    const response = await fetch(`${PROD_URL}/login`);
    const html = await response.text();
    if (html.includes('Welcome Back')) {
      console.log('✅ Login page loads correctly');
    } else {
      console.log('❌ Login page content not found');
    }
  } catch (error) {
    console.error('❌ Login page test failed:', error.message);
  }

  // Test 4: Test form submission (signup)
  console.log('\n4️⃣ Testing Signup Form Submission...');
  const testUser = {
    username: `prodtest${Date.now()}`,
    email: `prodtest${Date.now()}@example.com`,
    password: 'testpassword123',
    city: 'Test City',
    age: 25
  };

  try {
    const signupResponse = await fetch(`${PROD_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(testUser).toString(),
      redirect: 'manual'
    });

    console.log('Signup Status:', signupResponse.status);
    if (signupResponse.status === 302) {
      console.log('✅ Signup form works - redirected successfully');
      
      // Test 5: Test login with the created user
      console.log('\n5️⃣ Testing Login Form Submission...');
      const loginResponse = await fetch(`${PROD_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username: testUser.username,
          password: testUser.password
        }).toString(),
        redirect: 'manual'
      });

      console.log('Login Status:', loginResponse.status);
      if (loginResponse.status === 302) {
        console.log('✅ Login form works - redirected successfully');
      } else {
        console.log('❌ Login form failed');
      }
    } else {
      console.log('❌ Signup form failed');
    }
  } catch (error) {
    console.error('❌ Form submission test failed:', error.message);
  }

  console.log('\n🎉 Production tests completed!');
  console.log('\n🌐 Visit your app at:', PROD_URL);
}

testProduction().catch(console.error);