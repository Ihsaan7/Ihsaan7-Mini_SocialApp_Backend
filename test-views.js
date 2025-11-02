// Simple test to check if views are working
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const PROD_URL = 'https://mini-social-i525tyguc-egzziwd-8640s-projects.vercel.app';

async function testViews() {
  console.log('🧪 Testing Views on Production...\n');
  console.log('🌐 URL:', PROD_URL);

  try {
    console.log('\n1️⃣ Testing Signup Page...');
    const response = await fetch(PROD_URL);
    console.log('Status:', response.status);
    
    if (response.status === 200) {
      const html = await response.text();
      if (html.includes('Create your account')) {
        console.log('✅ Signup page loads correctly');
        console.log('✅ Views directory is working');
      } else {
        console.log('❌ Signup page content not found');
        console.log('First 200 chars:', html.substring(0, 200));
      }
    } else {
      console.log('❌ Signup page returned status:', response.status);
      const text = await response.text();
      console.log('Error:', text.substring(0, 300));
    }

    console.log('\n2️⃣ Testing Login Page...');
    const loginResponse = await fetch(`${PROD_URL}/login`);
    console.log('Login Status:', loginResponse.status);
    
    if (loginResponse.status === 200) {
      const html = await loginResponse.text();
      if (html.includes('Welcome Back')) {
        console.log('✅ Login page loads correctly');
      } else {
        console.log('❌ Login page content not found');
      }
    } else {
      console.log('❌ Login page failed');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎉 Views test completed!');
}

testViews().catch(console.error);