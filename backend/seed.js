const mysql = require('mysql2/promise');
require('dotenv').config();

const flatsData = [
  { id: 'f1', title: 'The Skyward Penthouse', type: 'flats', location: 'Gulshan 2, Dhaka', price: '৳ 55,000,000', size: '4,500 sq ft', bedrooms: 4, bathrooms: 5, description: 'An ultra-luxury penthouse with panoramic city skyline views, floor-to-ceiling windows, and elegant minimalist furniture.', image: '/images/flat-1.png' },
  { id: 'f2', title: 'Banani Lakeview Residence', type: 'flats', location: 'Banani, Dhaka', price: '৳ 32,500,000', size: '2,800 sq ft', bedrooms: 3, bathrooms: 4, description: 'A premium apartment with a modern glass facade, surrounded by lush green trees and unobstructed lake views at sunset.', image: '/images/flat-2.png' },
  { id: 'f3', title: 'Dhanmondi Signature Tower', type: 'flats', location: 'Dhanmondi, Dhaka', price: '৳ 28,000,000', size: '2,500 sq ft', bedrooms: 3, bathrooms: 3, description: 'Luxury condominium featuring a stunning master bedroom with dark aesthetics, warm ambient lighting, and high-end interior design.', image: '/images/flat-3.png' },
  { id: 'f4', title: 'Baridhara Diplomatic Enclave', type: 'flats', location: 'Baridhara, Dhaka', price: '৳ 85,000,000', size: '6,200 sq ft', bedrooms: 5, bathrooms: 6, description: 'A masterpiece of modern design. This apartment features a minimalist kitchen with a dark marble island and sleek black cabinets.', image: '/images/flat-4.png' },
  { id: 'f5', title: 'Bashundhara Infinity Heights', type: 'flats', location: 'Bashundhara R/A, Dhaka', price: '৳ 42,000,000', size: '3,200 sq ft', bedrooms: 4, bathrooms: 4, description: 'Exclusive residential living featuring a rooftop infinity pool reflecting city lights, with cinematic architectural details.', image: '/images/flat-5.png' },
  { id: 'f6', title: 'Uttara Royal Suites', type: 'flats', location: 'Uttara Sector 4, Dhaka', price: '৳ 25,000,000', size: '2,400 sq ft', bedrooms: 3, bathrooms: 3, description: 'Spacious and elegant flat offering contemporary living with excellent cross-ventilation and natural lighting.', image: '/images/flat-1.png' },
  { id: 'f7', title: 'Gulshan Avenue Elegance', type: 'flats', location: 'Gulshan 1, Dhaka', price: '৳ 48,000,000', size: '3,800 sq ft', bedrooms: 4, bathrooms: 5, description: 'Located in the heart of the city, this flat combines sophisticated design with absolute convenience and privacy.', image: '/images/flat-2.png' },
  { id: 'f8', title: 'Baily Road Heritage', type: 'flats', location: 'Baily Road, Dhaka', price: '৳ 35,000,000', size: '3,000 sq ft', bedrooms: 4, bathrooms: 4, description: 'A perfect blend of heritage location and ultra-modern interior design. A rare find in one of Dhaka’s most historic neighborhoods.', image: '/images/flat-3.png' },
  { id: 'f9', title: 'Mohakhali DOHS Retreat', type: 'flats', location: 'Mohakhali DOHS, Dhaka', price: '৳ 38,000,000', size: '3,100 sq ft', bedrooms: 4, bathrooms: 4, description: 'Secure, quiet, and peaceful. This property boasts large balconies and an expansive open-plan living and dining area.', image: '/images/flat-4.png' },
  { id: 'f10', title: 'Mirpur Skyline Oasis', type: 'flats', location: 'Mirpur DOHS, Dhaka', price: '৳ 22,000,000', size: '2,100 sq ft', bedrooms: 3, bathrooms: 3, description: 'Affordable luxury featuring smart home automation, rooftop amenities, and breathtaking evening views of the cityscape.', image: '/images/flat-5.png' },
  { id: 'f11', title: 'Lakeshore Tranquility', type: 'flats', location: 'Gulshan 2, Dhaka', price: '৳ 62,000,000', size: '5,000 sq ft', bedrooms: 5, bathrooms: 6, description: 'An architectural marvel overlooking the Gulshan lake. Offers unparalleled luxury, a private gym, and a home theater setup.', image: '/images/flat-1.png' },
  { id: 'f12', title: 'Dhanmondi Lake Heights', type: 'flats', location: 'Dhanmondi, Dhaka', price: '৳ 34,000,000', size: '2,900 sq ft', bedrooms: 3, bathrooms: 4, description: 'Experience premium lakeside living with south-facing breeze, premium imported fittings, and vertical gardens.', image: '/images/flat-2.png' },
  { id: 'f13', title: 'Banani Central Boulevard', type: 'flats', location: 'Banani Road 11, Dhaka', price: '৳ 45,000,000', size: '3,600 sq ft', bedrooms: 4, bathrooms: 5, description: 'Situated on the vibrant Road 11, offering soundproof glazing, high ceilings, and immediate access to premium lifestyle hubs.', image: '/images/flat-3.png' },
  { id: 'f14', title: 'Bashundhara Executive Living', type: 'flats', location: 'Bashundhara Block I, Dhaka', price: '৳ 29,000,000', size: '2,600 sq ft', bedrooms: 3, bathrooms: 3, description: 'A cozy yet highly luxurious flat designed for modern executives. Features an attached home office and library space.', image: '/images/flat-4.png' },
  { id: 'f15', title: 'Baridhara Parkview', type: 'flats', location: 'Baridhara, Dhaka', price: '৳ 72,000,000', size: '5,500 sq ft', bedrooms: 5, bathrooms: 5, description: 'The epitome of exclusivity. A full-floor apartment offering 360-degree views, a private elevator lobby, and grand interiors.', image: '/images/flat-5.png' }
];

const landData = [
  { id: 'l1', title: 'Gulshan Avenue Prime Plot', type: 'land', location: 'Gulshan 1, Dhaka', price: '৳ 450,000,000', size: '10 Katha', zone: 'Commercial/Residential', access: '60ft Road', description: 'A highly sought-after corner plot on Gulshan Avenue. Ideal for a luxury high-rise commercial complex.', image: '/images/land-1.png' },
  { id: 'l2', title: 'Banani Lakeside Estate', type: 'land', location: 'Banani, Dhaka', price: '৳ 320,000,000', size: '8 Katha', zone: 'Residential', access: '40ft Road', description: 'Exclusive lakeside land offering breathtaking views. Perfect for a private luxury villa or boutique apartment building.', image: '/images/land-2.png' },
  { id: 'l3', title: 'Dhanmondi Commercial Hub', type: 'land', location: 'Dhanmondi 27, Dhaka', price: '৳ 280,000,000', size: '7 Katha', zone: 'Commercial', access: '80ft Road', description: 'Prime commercial land located in the heart of Dhanmondi. High foot traffic and excellent visibility.', image: '/images/land-3.png' },
  { id: 'l4', title: 'Baridhara Diplomatic Zone Plot', type: 'land', location: 'Baridhara, Dhaka', price: '৳ 600,000,000', size: '15 Katha', zone: 'Residential', access: '50ft Road', description: 'Ultra-secure, serene environment within the diplomatic enclave. The most prestigious address available.', image: '/images/land-4.png' },
  { id: 'l5', title: 'Bashundhara Block A Corner', type: 'land', location: 'Bashundhara R/A, Dhaka', price: '৳ 180,000,000', size: '10 Katha', zone: 'Residential', access: '100ft Avenue', description: 'Spacious corner plot on a massive avenue in Block A. Ready for immediate development with utilities.', image: '/images/land-5.png' },
  { id: 'l6', title: 'Uttara Sector 3 Premium Land', type: 'land', location: 'Uttara, Dhaka', price: '৳ 150,000,000', size: '8 Katha', zone: 'Residential', access: '40ft Road', description: 'South-facing rectangular plot in a quiet, fully developed sector of Uttara. Close to parks.', image: '/images/land-1.png' },
  { id: 'l7', title: 'Purbachal Sector 1 Lakeview', type: 'land', location: 'Purbachal New Town', price: '৳ 120,000,000', size: '10 Katha', zone: 'Residential', access: '60ft Road', description: 'Future-proof your investment with this stunning lake-facing plot in Purbachal Sector 1.', image: '/images/land-2.png' },
  { id: 'l8', title: 'Mohakhali DOHS Double Plot', type: 'land', location: 'Mohakhali DOHS, Dhaka', price: '৳ 400,000,000', size: '12 Katha', zone: 'Residential', access: '30ft Road', description: 'Extremely rare double plot inside the secure and peaceful Mohakhali DOHS.', image: '/images/land-3.png' },
  { id: 'l9', title: 'Mirpur DOHS Corner Lot', type: 'land', location: 'Mirpur DOHS, Dhaka', price: '৳ 110,000,000', size: '6 Katha', zone: 'Residential', access: '40ft Road', description: 'Well-positioned corner lot with great natural light access. Secure community living.', image: '/images/land-4.png' },
  { id: 'l10', title: 'Baily Road Heritage Plot', type: 'land', location: 'Baily Road, Dhaka', price: '৳ 220,000,000', size: '7 Katha', zone: 'Mixed Use', access: '50ft Road', description: 'A rare piece of land in the cultural heart of Dhaka. Suitable for high-end boutique apartments.', image: '/images/land-5.png' },
  { id: 'l11', title: 'Gulshan 2 South-Facing Plot', type: 'land', location: 'Gulshan 2, Dhaka', price: '৳ 380,000,000', size: '9 Katha', zone: 'Residential', access: '30ft Road', description: 'Highly desirable south-facing orientation ensuring maximum breeze.', image: '/images/land-1.png' },
  { id: 'l12', title: 'Tejgaon Industrial/Commercial', type: 'land', location: 'Tejgaon I/A, Dhaka', price: '৳ 800,000,000', size: '20 Katha', zone: 'Commercial', access: '120ft Highway', description: 'Massive land parcel directly on the main artery. Unmatched logistical advantage.', image: '/images/land-2.png' },
  { id: 'l13', title: 'Dhanmondi Lakefront', type: 'land', location: 'Dhanmondi, Dhaka', price: '৳ 350,000,000', size: '8 Katha', zone: 'Residential', access: '40ft Road', description: 'Build your dream home directly overlooking Dhanmondi Lake. A serene escape.', image: '/images/land-3.png' },
  { id: 'l14', title: 'Bashundhara Block I Ext', type: 'land', location: 'Bashundhara R/A, Dhaka', price: '৳ 90,000,000', size: '5 Katha', zone: 'Residential', access: '30ft Road', description: 'Excellent investment opportunity in the fast-developing Block I extension.', image: '/images/land-4.png' },
  { id: 'l15', title: 'Banani Road 11 Commercial', type: 'land', location: 'Banani Road 11, Dhaka', price: '৳ 550,000,000', size: '10 Katha', zone: 'Commercial', access: '60ft Road', description: 'The ultimate commercial address. Perfect for luxury retail or a boutique hotel.', image: '/images/land-5.png' }
];

const rentData = [
  { id: 'r1', title: 'Gulshan Executive Suite', type: 'rent', location: 'Gulshan 2, Dhaka', price: '৳ 150,000 / month', size: '2,000 sq ft', bedrooms: 3, bathrooms: 3, description: 'Fully furnished premium apartment with bright sunny living rooms.', image: '/images/rent-1.png' },
  { id: 'r2', title: 'Banani Serviced Condo', type: 'rent', location: 'Banani Road 11, Dhaka', price: '৳ 120,000 / month', size: '1,500 sq ft', bedrooms: 2, bathrooms: 2, description: 'High-end serviced apartment featuring premium hotel-style bedding.', image: '/images/rent-2.png' },
  { id: 'r3', title: 'Dhanmondi Lakeview Rental', type: 'rent', location: 'Dhanmondi, Dhaka', price: '৳ 95,000 / month', size: '1,800 sq ft', bedrooms: 3, bathrooms: 3, description: 'Modern minimalist open-plan kitchen and dining area.', image: '/images/rent-3.png' },
  { id: 'r4', title: 'Baridhara Penthouse Lease', type: 'rent', location: 'Baridhara, Dhaka', price: '৳ 350,000 / month', size: '4,500 sq ft', bedrooms: 4, bathrooms: 5, description: 'Luxury penthouse balcony offering comfortable outdoor seating.', image: '/images/rent-4.png' },
  { id: 'r5', title: 'Bashundhara Luxury Flat', type: 'rent', location: 'Bashundhara R/A, Dhaka', price: '৳ 85,000 / month', size: '2,200 sq ft', bedrooms: 3, bathrooms: 4, description: 'Exclusive luxury rental with a stunning bathroom.', image: '/images/rent-5.png' },
  { id: 'r6', title: 'Uttara Sector 4 Apartment', type: 'rent', location: 'Uttara, Dhaka', price: '৳ 65,000 / month', size: '1,600 sq ft', bedrooms: 3, bathrooms: 3, description: 'Spacious and breezy apartment for rent. Ideal for families.', image: '/images/rent-1.png' },
  { id: 'r7', title: 'Gulshan 1 Corporate Housing', type: 'rent', location: 'Gulshan 1, Dhaka', price: '৳ 180,000 / month', size: '2,500 sq ft', bedrooms: 4, bathrooms: 4, description: 'Tailored for corporate housing. Fully equipped with modern electronics.', image: '/images/rent-2.png' },
  { id: 'r8', title: 'Mohakhali DOHS Family Unit', type: 'rent', location: 'Mohakhali DOHS, Dhaka', price: '৳ 75,000 / month', size: '1,900 sq ft', bedrooms: 3, bathrooms: 3, description: 'Highly secure environment in DOHS. Open kitchen, large living area.', image: '/images/rent-3.png' },
  { id: 'r9', title: 'Baily Road Classic Flat', type: 'rent', location: 'Baily Road, Dhaka', price: '৳ 80,000 / month', size: '2,100 sq ft', bedrooms: 3, bathrooms: 3, description: 'Classic architecture mixed with modern amenities.', image: '/images/rent-4.png' },
  { id: 'r10', title: 'Mirpur DOHS Modern Rent', type: 'rent', location: 'Mirpur DOHS, Dhaka', price: '৳ 50,000 / month', size: '1,400 sq ft', bedrooms: 3, bathrooms: 2, description: 'Affordable modern living in a secure DOHS zone.', image: '/images/rent-5.png' },
  { id: 'r11', title: 'Baridhara Diplomatic Residence', type: 'rent', location: 'Baridhara, Dhaka', price: '৳ 250,000 / month', size: '3,500 sq ft', bedrooms: 4, bathrooms: 4, description: 'Ultra-secure residence in the diplomatic zone.', image: '/images/rent-1.png' },
  { id: 'r12', title: 'Banani Central Loft', type: 'rent', location: 'Banani, Dhaka', price: '৳ 130,000 / month', size: '1,700 sq ft', bedrooms: 2, bathrooms: 2, description: 'A stylish, industrial-chic loft apartment.', image: '/images/rent-2.png' },
  { id: 'r13', title: 'Dhanmondi Family Condo', type: 'rent', location: 'Dhanmondi, Dhaka', price: '৳ 110,000 / month', size: '2,400 sq ft', bedrooms: 4, bathrooms: 4, description: 'Large family condominium offering spacious bedrooms.', image: '/images/rent-3.png' },
  { id: 'r14', title: 'Bashundhara Executive Suite', type: 'rent', location: 'Bashundhara Block D, Dhaka', price: '৳ 70,000 / month', size: '1,650 sq ft', bedrooms: 3, bathrooms: 3, description: 'Quiet residential block. The apartment features a smart layout.', image: '/images/rent-4.png' },
  { id: 'r15', title: 'Gulshan Lakeside Rental', type: 'rent', location: 'Gulshan 2, Dhaka', price: '৳ 190,000 / month', size: '2,800 sq ft', bedrooms: 3, bathrooms: 4, description: 'Breathtaking lake views from the master bedroom and balcony.', image: '/images/rent-5.png' }
];

async function seedDatabase() {
  try {
    // 1. Connect without database to create it if it doesn't exist
    console.log('Connecting to MySQL to check DB...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await connection.end();
    console.log(`Database '${process.env.DB_NAME}' checked/created successfully.`);

    // 2. Sync Sequelize models
    const { sequelize, Property } = require('./models');
    await sequelize.sync({ force: true }); // Warning: This drops the table and re-creates it
    console.log('Database synced.');

    // 3. Bulk insert data
    const allData = [...flatsData, ...landData, ...rentData];
    await Property.bulkCreate(allData);
    console.log(`Successfully seeded ${allData.length} properties!`);

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  }
}

seedDatabase();
