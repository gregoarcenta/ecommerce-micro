import { Gender, Prisma, ProductStatus, Size, Type } from 'generated/prisma';

export const productsInitialData: Prisma.ProductCreateInput[] = [
  {
    name: "Men's Chill Crew Neck Sweatshirt",
    description:
      "Introducing the Tesla Chill Collection. The Men's Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/ql5rsw3bnebyjp8sun3r.webp',
          publicId: 'ecommerce/products/ql5rsw3bnebyjp8sun3r',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/evjw10lt3xnszvo2ar4z.webp',
          publicId: 'ecommerce/products/evjw10lt3xnszvo2ar4z',
        },
      ],
    },
    stock: 7,
    price: '75.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'mens_chill_crew_neck_sweatshirt',
    type: Type.SHIRTS,
    tags: ['sweatshirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Quilted Shirt Jacket",
    description:
      "The Men's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/xcw7s3w9fmai1anrcdwf.jpg',
          publicId: 'ecommerce/products/xcw7s3w9fmai1anrcdwf',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/ii0ye9u0elcuohv6lhuq.jpg',
          publicId: 'ecommerce/products/ii0ye9u0elcuohv6lhuq',
        },
      ],
    },
    stock: 5,
    price: '200.00',
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: 'men_quilted_shirt_jacket',
    type: Type.SHIRTS,
    tags: ['jacket'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Raven Lightweight Zip Up Bomber Jacket",
    description:
      "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Zip Up Bomber has a premium, modern silhouette made from a sustainable bamboo cotton blend for versatility in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, a concealed chest pocket with custom matte zipper pulls and a french terry interior. Made from 70% bamboo and 30% cotton.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/slgkaokfwhclfm1nkgqb.jpg',
          publicId: 'ecommerce/products/slgkaokfwhclfm1nkgqb',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/cfzyv2ych227ylyeik55.jpg',
          publicId: 'ecommerce/products/cfzyv2ych227ylyeik55',
        },
      ],
    },
    stock: 10,
    price: '130.00',
    sizes: [Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'men_raven_lightweight_zip_up_bomber_jacket',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Turbine Long Sleeve Tee",
    description:
      "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Long Sleeve Tee features a subtle, water-based T logo on the left chest and our Tesla wordmark below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/g4vtixxu4a0slzokntjm.jpg',
          publicId: 'ecommerce/products/g4vtixxu4a0slzokntjm',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/ls6tpmiwzmzqf5rbp0wp.jpg',
          publicId: 'ecommerce/products/ls6tpmiwzmzqf5rbp0wp',
        },
      ],
    },
    stock: 50,
    price: '45.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L],
    slug: 'men_turbine_long_sleeve_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Turbine Short Sleeve Tee",
    description:
      "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/s6xa6iiwa7pew6rpymbq.jpg',
          publicId: 'ecommerce/products/s6xa6iiwa7pew6rpymbq',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/rbdytanmlswsynecpqbh.jpg',
          publicId: 'ecommerce/products/rbdytanmlswsynecpqbh',
        },
      ],
    },
    stock: 50,
    price: '40.00',
    sizes: [Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'men_turbine_short_sleeve_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Cybertruck Owl Tee",
    description:
      'Designed for comfort, the Cybertruck Owl Tee is made from 100% cotton and features our signature Cybertruck icon on the back.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/jhrgh2z0wuscq5g9ibrn.jpg',
          publicId: 'ecommerce/products/jhrgh2z0wuscq5g9ibrn',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/nbfzdsk4irzqhnwws4ax.jpg',
          publicId: 'ecommerce/products/nbfzdsk4irzqhnwws4ax',
        },
      ],
    },
    stock: 0,
    price: '35.00',
    sizes: [Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'men_cybertruck_owl_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Solar Roof Tee",
    description:
      "Inspired by our fully integrated home solar and storage system, the Tesla Solar Roof Tee advocates for clean, sustainable energy wherever you go. Designed for fit, comfort and style, the tee features an aerial view of our seamless Solar Roof design on the front with our signature T logo above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/stpdx61ys7qjlzvx2ivr.jpg',
          publicId: 'ecommerce/products/stpdx61ys7qjlzvx2ivr',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/m5hj69o9phnr8i4gtiiy.jpg',
          publicId: 'ecommerce/products/m5hj69o9phnr8i4gtiiy',
        },
      ],
    },
    stock: 15,
    price: '35.00',
    sizes: [Size.S, Size.M, Size.L, Size.XL],
    slug: 'men_solar_roof_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Let the Sun Shine Tee",
    description:
      "Inspired by the world's most unlimited resource, the Let the Sun Shine Tee highlights our fully integrated home solar and storage system. Designed for fit, comfort and style, the tee features a sunset graphic along with our Tesla wordmark on the front and our signature T logo printed above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/edmxaxsgj5zdtydh650i.jpg',
          publicId: 'ecommerce/products/edmxaxsgj5zdtydh650i',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/sqq02mlvi0rtktntujtp.jpg',
          publicId: 'ecommerce/products/sqq02mlvi0rtktntujtp',
        },
      ],
    },
    stock: 17,
    price: '35.00',
    sizes: [Size.XS, Size.S, Size.XL, Size.XXL],
    slug: 'men_let_the_sun_shine_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's 3D Large Wordmark Tee",
    description:
      "Designed for fit, comfort and style, the Men's 3D Large Wordmark Tee is made from 100% Peruvian cotton with a 3D silicone-printed Tesla wordmark printed across the chest.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/qrbbmrd7dohnghmlpys9.jpg',
          publicId: 'ecommerce/products/qrbbmrd7dohnghmlpys9',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/dtbrf04unj3jqn0tbpqc.jpg',
          publicId: 'ecommerce/products/dtbrf04unj3jqn0tbpqc',
        },
      ],
    },
    stock: 12,
    price: '35.00',
    sizes: [Size.XS, Size.S, Size.M],
    slug: 'men_3d_large_wordmark_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's 3D T Logo Tee",
    description:
      'Designed for fit, comfort and style, the Tesla T Logo Tee is made from 100% Peruvian cotton and features a silicone-printed T Logo on the left chest.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/xuusu8rydjbjccajc0pj.jpg',
          publicId: 'ecommerce/products/xuusu8rydjbjccajc0pj',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/jimzm0a4ov6f06mvwgoa.jpg',
          publicId: 'ecommerce/products/jimzm0a4ov6f06mvwgoa',
        },
      ],
    },
    stock: 5,
    price: '35.00',
    sizes: [Size.XS, Size.S],
    slug: 'men_3d_t_logo_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's 3D Small Wordmark Tee",
    description:
      'Designed for comfort and style in any size, the Tesla Small Wordmark Tee is made from 100% Peruvian cotton and features a 3D silicone-printed wordmark on the left chest.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/kptuuxqwxke7j1am7ye4.jpg',
          publicId: 'ecommerce/products/kptuuxqwxke7j1am7ye4',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/tuolt6bu4kxnqjoxdty7.jpg',
          publicId: 'ecommerce/products/tuolt6bu4kxnqjoxdty7',
        },
      ],
    },
    stock: 2,
    price: '35.00',
    sizes: [Size.XS, Size.S, Size.M],
    slug: 'men_3d_small_wordmark_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Plaid Mode Tee",
    description:
      "Designed to celebrate Tesla's incredible performance mode, the Plaid Mode Tee features great fit, comfort and style. Made from 100% cotton, it's the next best thing to riding shotgun at the Nürburgring.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/caymuimfu8u7a9scettm.jpg',
          publicId: 'ecommerce/products/caymuimfu8u7a9scettm',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/x6wlbxzkbu1dgviesnta.jpg',
          publicId: 'ecommerce/products/x6wlbxzkbu1dgviesnta',
        },
      ],
    },
    stock: 82,
    price: '35.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'men_plaid_mode_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Powerwall Tee",
    description:
      "Inspired by our popular home battery, the Tesla Powerwall Tee is made from 100% cotton and features the phrase 'Pure Energy' under our signature logo in the back. Designed for fit, comfort and style, the exclusive tee promotes sustainable energy in any environment.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/m08irb9crjfvpzeajcj6.jpg',
          publicId: 'ecommerce/products/m08irb9crjfvpzeajcj6',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/sgnnqirw3gdof1l9vri8.jpg',
          publicId: 'ecommerce/products/sgnnqirw3gdof1l9vri8',
        },
      ],
    },
    stock: 24,
    price: '35.00',
    sizes: [Size.XL, Size.XXL],
    slug: 'men_powerwall_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Battery Day Tee",
    description:
      'Inspired by Tesla Battery Day and featuring the unveiled tabless battery cell, Battery Day Tee celebrates the future of energy storage and cell manufacturing. Designed for fit, comfort and style, Battery Day Tee is made from 100% cotton with a stylized cell printed across the chest. Made in Peru.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/iwilapbk8iipfrjvcpe6.jpg',
          publicId: 'ecommerce/products/iwilapbk8iipfrjvcpe6',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/h3diqni3hku0zly0crzc.jpg',
          publicId: 'ecommerce/products/h3diqni3hku0zly0crzc',
        },
      ],
    },
    stock: 5,
    price: '30.00',
    sizes: [Size.XS, Size.S, Size.XXL],
    slug: 'men_battery_day_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Cybertruck Bulletproof Tee",
    description:
      'Designed for exceptional comfort and inspired by the Cybertruck unveil event, the Cybertruck Bulletproof Tee is made from 100% cotton and features our signature Cybertruck icon on the back.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/k5hrpenr5sk0v3lk6p5s.jpg',
          publicId: 'ecommerce/products/k5hrpenr5sk0v3lk6p5s',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/sygfeaheuyfjfznglryy.jpg',
          publicId: 'ecommerce/products/sygfeaheuyfjfznglryy',
        },
      ],
    },
    stock: 150,
    price: '30.00',
    sizes: [Size.M, Size.L],
    slug: 'men_cybertruck_bulletproof_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Haha Yes Tee",
    description:
      'Inspired by the Model Y order confirmation graphic, the limited edition Haha Yes Tee is designed for comfort and style. Made from 100% Peruvian cotton and featuring the Tesla wordmark across the chest, the exclusive tee will commemorate your order for years to come.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/pp7chx6hp1aftccuzfrk.jpg',
          publicId: 'ecommerce/products/pp7chx6hp1aftccuzfrk',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/wvrtie9fowo2ziempmy4.jpg',
          publicId: 'ecommerce/products/wvrtie9fowo2ziempmy4',
        },
      ],
    },
    stock: 10,
    price: '35.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'men_haha_yes_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's S3XY Tee",
    description:
      "Designed for fit, comfort and style, the limited edition S3XY Tee is made from 100% cotton with a 3D silicone-printed 'S3XY' logo across the chest. Made in Peru. Available in black.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/l2rircfupcndjx4jnr6r.jpg',
          publicId: 'ecommerce/products/l2rircfupcndjx4jnr6r',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/vfs1zego7i9s8n96x1cw.jpg',
          publicId: 'ecommerce/products/vfs1zego7i9s8n96x1cw',
        },
      ],
    },
    stock: 34,
    price: '35.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L],
    slug: 'men_s3xy_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's 3D Wordmark Long Sleeve Tee",
    description:
      "Designed for fit, comfort and style, the Men's 3D Wordmark Long Sleeve Tee is made from 100% cotton and features an understated wordmark logo on the left chest.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/ngblxebozstd6x3rrrci.jpg',
          publicId: 'ecommerce/products/ngblxebozstd6x3rrrci',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/xceinpdzirjishdr2evi.jpg',
          publicId: 'ecommerce/products/xceinpdzirjishdr2evi',
        },
      ],
    },
    stock: 15,
    price: '40.00',
    sizes: [Size.XL, Size.XXL],
    slug: 'men_3d_wordmark_long_sleeve_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's 3D T Logo Long Sleeve Tee",
    description:
      "Designed for fit, comfort and style, the Men's 3D T Logo Long Sleeve Tee is made from 100% cotton and features an understated T logo on the left chest.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/eurlhawpyotakmhe6vyt.jpg',
          publicId: 'ecommerce/products/eurlhawpyotakmhe6vyt',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/xhltheyelq8ccuifllnj.jpg',
          publicId: 'ecommerce/products/xhltheyelq8ccuifllnj',
        },
      ],
    },
    stock: 12,
    price: '40.00',
    sizes: [Size.XS, Size.XXL],
    slug: 'men_3d_t_logo_long_sleeve_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Raven Lightweight Hoodie",
    description:
      "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Hoodie has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve with a french terry interior for versatility in any season. Made from 70% bamboo and 30% cotton.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/juu2qbdiafjwdd4epdv0.jpg',
          publicId: 'ecommerce/products/juu2qbdiafjwdd4epdv0',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/eeqzsttdagmnxjq4kz4g.jpg',
          publicId: 'ecommerce/products/eeqzsttdagmnxjq4kz4g',
        },
      ],
    },
    stock: 10,
    price: '115.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'men_raven_lightweight_hoodie',
    type: Type.HOODIES,
    tags: ['hoodie'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Chill Pullover Hoodie',
    description:
      'Introducing the Tesla Chill Collection. The Chill Pullover Hoodie has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The unisex hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve, a double layer single seam hood and pockets with custom matte zipper pulls. Made from 60% cotton and 40% recycled polyester.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/yccsuzprxfkbqf6wz4jy.jpg',
          publicId: 'ecommerce/products/yccsuzprxfkbqf6wz4jy',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/ao951n6zu1za8a8rbtdk.jpg',
          publicId: 'ecommerce/products/ao951n6zu1za8a8rbtdk',
        },
      ],
    },
    stock: 10,
    price: '130.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'chill_pullover_hoodie',
    type: Type.HOODIES,
    tags: ['hoodie'],
    gender: Gender.UNISEX,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Chill Full Zip Hoodie",
    description:
      "Introducing the Tesla Chill Collection. The Men's Chill Full Zip Hoodie has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and sleeve, a double layer single seam hood and pockets with custom matte zipper pulls. Made from 60% cotton and 40% recycled polyester.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/ekwirnmvdg2egqvlwldx.jpg',
          publicId: 'ecommerce/products/ekwirnmvdg2egqvlwldx',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/lyvnitudfzcxqakbzods.jpg',
          publicId: 'ecommerce/products/lyvnitudfzcxqakbzods',
        },
      ],
    },
    stock: 100,
    price: '85.00',
    sizes: [Size.XS, Size.L, Size.XL, Size.XXL],
    slug: 'men_chill_full_zip_hoodie',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Chill Quarter Zip Pullover - Gray",
    description:
      "Introducing the Tesla Chill Collection. The Men's Chill Quarter Zip Pullover has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The pullover features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, as well as a custom matte zipper pull. Made from 60% cotton and 40% recycled polyester.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/tcqevtdme1enh7akfuao.jpg',
          publicId: 'ecommerce/products/tcqevtdme1enh7akfuao',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/ryieaxo7i9ub7sfkfa6y.jpg',
          publicId: 'ecommerce/products/ryieaxo7i9ub7sfkfa6y',
        },
      ],
    },
    stock: 7,
    price: '85.00',
    sizes: [Size.XS, Size.S, Size.M],
    slug: 'men_chill_quarter_zip_pullover_-_gray',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Men's Chill Quarter Zip Pullover - White",
    description:
      "Introducing the Tesla Chill Collection. The Men's Chill Quarter Zip Pullover has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The pullover features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, as well as a custom matte zipper pull. Made from 60% cotton and 40% recycled polyester.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/mhjn5tmbcvexhervvfiy.jpg',
          publicId: 'ecommerce/products/mhjn5tmbcvexhervvfiy',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/liwlagit1kklewbpwelf.jpg',
          publicId: 'ecommerce/products/liwlagit1kklewbpwelf',
        },
      ],
    },
    stock: 15,
    price: '85.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L],
    slug: 'men_chill_quarter_zip_pullover_-_white',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.MEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: '3D Large Wordmark Pullover Hoodie',
    description:
      'The Unisex 3D Large Wordmark Pullover Hoodie features soft fleece and an adjustable, jersey-lined hood for comfort and coverage. Designed in a unisex style, the pullover hoodie includes a tone-on-tone 3D silicone-printed wordmark across the chest.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/hmq1bj9k6h2opay10yxg.jpg',
          publicId: 'ecommerce/products/hmq1bj9k6h2opay10yxg',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/rjcjeffn0jc247dfbdre.jpg',
          publicId: 'ecommerce/products/rjcjeffn0jc247dfbdre',
        },
      ],
    },
    stock: 15,
    price: '70.00',
    sizes: [Size.XS, Size.S, Size.XL, Size.XXL],
    slug: '3d_large_wordmark_pullover_hoodie',
    type: Type.HOODIES,
    tags: ['hoodie'],
    gender: Gender.UNISEX,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Cybertruck Graffiti Hoodie',
    description:
      'As with the iconic Tesla logo, the Cybertruck Graffiti Hoodie is a classic in the making. Unisex style featuring soft fleece and an adjustable, jersey-lined hood for comfortable coverage.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/ormhegiv58arvfdivuc4.jpg',
          publicId: 'ecommerce/products/ormhegiv58arvfdivuc4',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/uvkwrwbmppitarmcw3rh.jpg',
          publicId: 'ecommerce/products/uvkwrwbmppitarmcw3rh',
        },
      ],
    },
    stock: 13,
    price: '60.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'cybertruck_graffiti_hoodie',
    type: Type.HOODIES,
    tags: ['hoodie'],
    gender: Gender.UNISEX,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Relaxed T Logo Hat',
    description:
      'The Relaxed T Logo Hat is a classic silhouette combined with modern details, featuring a 3D T logo and a custom metal buckle closure. The ultrasoft design is flexible and abrasion resistant, while the inner sweatband includes quilted padding for extra comfort and moisture wicking. The visor is fully made from recycled plastic bottles. 100% Cotton.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/tauzsezzrzpero8mwwqs.jpg',
          publicId: 'ecommerce/products/tauzsezzrzpero8mwwqs',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/ce01qilnaedkx5xebxu2.jpg',
          publicId: 'ecommerce/products/ce01qilnaedkx5xebxu2',
        },
      ],
    },
    stock: 11,
    price: '30.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'relaxed_t_logo_hat',
    type: Type.HATS,
    tags: ['hats'],
    gender: Gender.UNISEX,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Thermal Cuffed Beanie',
    description:
      'The Relaxed T Logo Hat is a classic silhouette combined with modern details, featuring a 3D T logo and a custom metal buckle closure. The ultrasoft design is flexible and abrasion resistant, while the inner sweatband includes quilted padding for extra comfort and moisture wicking. The visor is fully made from recycled plastic bottles. 100% Cotton.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/xjsfsi4dmrnulzhmpdck.jpg',
          publicId: 'ecommerce/products/xjsfsi4dmrnulzhmpdck',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/dtizift2tvhwsc1ib5g0.jpg',
          publicId: 'ecommerce/products/dtizift2tvhwsc1ib5g0',
        },
      ],
    },
    stock: 13,
    price: '35.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'thermal_cuffed_beanie',
    type: Type.HATS,
    tags: ['hats'],
    gender: Gender.UNISEX,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Women's Cropped Puffer Jacket",
    description:
      "The Women's Cropped Puffer Jacket features a uniquely cropped silhouette for the perfect, modern style while on the go during the cozy season ahead. The puffer features subtle silicone injected Tesla logos below the back collar and on the right sleeve, custom matte metal zipper pulls and a soft, fleece lined collar. Made from 87% nylon and 13% polyurethane.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/majbtc3jg6lp1s7fizlr.jpg',
          publicId: 'ecommerce/products/majbtc3jg6lp1s7fizlr',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/fomvyjwrhjetrxbtmwxg.jpg',
          publicId: 'ecommerce/products/fomvyjwrhjetrxbtmwxg',
        },
      ],
    },
    stock: 85,
    price: '225.00',
    sizes: [Size.XS, Size.S, Size.M],
    slug: 'women_cropped_puffer_jacket',
    type: Type.HOODIES,
    tags: ['hoodie'],
    gender: Gender.WOMEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Women's Chill Half Zip Cropped Hoodie",
    description:
      "Introducing the Tesla Chill Collection. The Women's Chill Half Zip Cropped Hoodie has a premium, soft fleece exterior and cropped silhouette for comfort in everyday lifestyle. The hoodie features an elastic hem that gathers at the waist, subtle thermoplastic polyurethane Tesla logos along the hood and on the sleeve, a double layer single seam hood and a custom ring zipper pull. Made from 60% cotton and 40% recycled polyester.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/g7ticy6g6daltmhypjsq.jpg',
          publicId: 'ecommerce/products/g7ticy6g6daltmhypjsq',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/yfihavvuwhf4ukpltrdt.jpg',
          publicId: 'ecommerce/products/yfihavvuwhf4ukpltrdt',
        },
      ],
    },
    stock: 10,
    price: '130.00',
    sizes: [Size.XS, Size.S, Size.M, Size.XXL],
    slug: 'women_chill_half_zip_cropped_hoodie',
    type: Type.HOODIES,
    tags: ['hoodie'],
    gender: Gender.WOMEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Women's Raven Slouchy Crew Sweatshirt",
    description:
      "Introducing the Tesla Raven Collection. The Women's Raven Slouchy Crew Sweatshirt has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The slouchy crew features a subtle thermoplastic polyurethane Tesla wordmark on the left sleeve and a french terry interior for a cozy look and feel in every season. Pair it with your Raven Joggers or favorite on the go fit. Made from 70% bamboo and 30% cotton.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/gyltscxkpnfufgowvitp.jpg',
          publicId: 'ecommerce/products/gyltscxkpnfufgowvitp',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/nn1agtmktqeeksswrt2q.jpg',
          publicId: 'ecommerce/products/nn1agtmktqeeksswrt2q',
        },
      ],
    },
    stock: 9,
    price: '110.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'women_raven_slouchy_crew_sweatshirt',
    type: Type.HOODIES,
    tags: ['hoodie'],
    gender: Gender.WOMEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Women's Turbine Cropped Long Sleeve Tee",
    description:
      "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Women's Turbine Cropped Long Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style with a cropped silhouette. Made from 50% cotton and 50%",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/uenvzsvslyh6zput1al1.jpg',
          publicId: 'ecommerce/products/uenvzsvslyh6zput1al1',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/iglmfla08a4adgl2troa.jpg',
          publicId: 'ecommerce/products/iglmfla08a4adgl2troa',
        },
      ],
    },
    stock: 10,
    price: '45.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'women_turbine_cropped_long_sleeve_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.WOMEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Women's Turbine Cropped Short Sleeve Tee",
    description:
      "ntroducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Women's Turbine Cropped Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style with a cropped silhouette. Made from 50% cotton and 50% polyester.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/xk6fkv2sngq57qeurjtq.jpg',
          publicId: 'ecommerce/products/xk6fkv2sngq57qeurjtq',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/mdmhkiq8umsjitedzdyq.jpg',
          publicId: 'ecommerce/products/mdmhkiq8umsjitedzdyq',
        },
      ],
    },
    stock: 0,
    price: '40.00',
    sizes: [Size.XS, Size.S],
    slug: 'women_turbine_cropped_short_sleeve_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.WOMEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Women's T Logo Short Sleeve Scoop Neck Tee",
    description:
      "Designed for style and comfort, the ultrasoft Women's T Logo Short Sleeve Scoop Neck Tee features a tonal 3D silicone-printed T logo on the left chest. Made of 50% Peruvian cotton and 50% Peruvian viscose.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/h912rcukrejrf8c4tr5e.jpg',
          publicId: 'ecommerce/products/h912rcukrejrf8c4tr5e',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/vsgqdeoz8epxcf2ljgiz.jpg',
          publicId: 'ecommerce/products/vsgqdeoz8epxcf2ljgiz',
        },
      ],
    },
    stock: 30,
    price: '35.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'women_t_logo_short_sleeve_scoop_neck_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.WOMEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Women's T Logo Long Sleeve Scoop Neck Tee",
    description:
      "Designed for style and comfort, the ultrasoft Women's T Logo Long Sleeve Scoop Neck Tee features a tonal 3D silicone-printed T logo on the left chest. Made of 50% Peruvian cotton and 50% Peruvian viscose.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/uv81i1cgjkogzzdqmopa.jpg',
          publicId: 'ecommerce/products/uv81i1cgjkogzzdqmopa',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/xszdxwh2ggggcwkczgg6.jpg',
          publicId: 'ecommerce/products/xszdxwh2ggggcwkczgg6',
        },
      ],
    },
    stock: 16,
    price: '40.00',
    sizes: [Size.XS, Size.S, Size.L, Size.XL, Size.XXL],
    slug: 'women_t_logo_long_sleeve_scoop_neck_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.WOMEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Women's Small Wordmark Short Sleeve V-Neck Tee",
    description:
      "Designed for style and comfort, the Women's Small Wordmark Short Sleeve V-Neck Tee features a tonal 3D silicone-printed wordmark on the left chest. Made of 100% Peruvian cotton.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/x3cgvdtqht9xlh00pw9x.jpg',
          publicId: 'ecommerce/products/x3cgvdtqht9xlh00pw9x',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/a2z1infka9nz9ujqy42h.jpg',
          publicId: 'ecommerce/products/a2z1infka9nz9ujqy42h',
        },
      ],
    },
    stock: 18,
    price: '35.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'women_small_wordmark_short_sleeve_v-neck_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.WOMEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Women's Large Wordmark Short Sleeve Crew Neck Tee",
    description:
      "Designed for style and comfort, the Women's Large Wordmark Short Sleeve Crew Neck Tee features a tonal 3D silicone-printed wordmark across the chest. Made of 100% Peruvian pima cotton.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/iftectnwkkccvx6oj3h2.jpg',
          publicId: 'ecommerce/products/iftectnwkkccvx6oj3h2',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/isfcih9jcdd4fh0wcym1.jpg',
          publicId: 'ecommerce/products/isfcih9jcdd4fh0wcym1',
        },
      ],
    },
    stock: 5,
    price: '35.00',
    sizes: [Size.XL, Size.XXL],
    slug: 'women_large_wordmark_short_sleeve_crew_neck_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.WOMEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Women's Plaid Mode Tee",
    description:
      "Designed to celebrate Tesla's incredible performance mode, the Plaid Mode Tee features great fit, comfort and style. Made from 100% cotton, it's the next best thing to riding shotgun at the Nürburgring.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/bg6xp5vkxwjgqquqapad.jpg',
          publicId: 'ecommerce/products/bg6xp5vkxwjgqquqapad',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/rtilqsounmqzaxgqo3t9.jpg',
          publicId: 'ecommerce/products/rtilqsounmqzaxgqo3t9',
        },
      ],
    },
    stock: 16,
    price: '35.00',
    sizes: [Size.S, Size.M],
    slug: 'women_plaid_mode_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.WOMEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Women's Powerwall Tee",
    description:
      "Inspired by our popular home battery, the Tesla Powerwall Tee is made from 100% cotton and features the phrase 'Pure Energy' under our signature logo in the back. Designed for fit, comfort and style, the exclusive tee promotes sustainable energy in any",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/ndh9yh8zbwhajzmvv2so.jpg',
          publicId: 'ecommerce/products/ndh9yh8zbwhajzmvv2so',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/t9ehknmswn33gogqbl9d.jpg',
          publicId: 'ecommerce/products/t9ehknmswn33gogqbl9d',
        },
      ],
    },
    stock: 10,
    price: '130.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'women_powerwall_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.WOMEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Women's Corp Jacket",
    description:
      "Fully customized and uniquely styled, the Women's Corp Jacket features a silicone-printed 'T' logo on the left chest and prominent Tesla wordmark across the back.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/tkjphglbok6ynfwyo4ym.jpg',
          publicId: 'ecommerce/products/tkjphglbok6ynfwyo4ym',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/yytegy5iab2ahtbfwrsy.jpg',
          publicId: 'ecommerce/products/yytegy5iab2ahtbfwrsy',
        },
      ],
    },
    stock: 3,
    price: '90.00',
    sizes: [Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'women_corp_jacket',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.WOMEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: "Women's Raven Joggers",
    description:
      "Introducing the Tesla Raven Collection. The Women's Raven Joggers have a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The joggers feature a subtle thermoplastic polyurethane Tesla wordmark and T logo and a french terry interior for a cozy look and feel in every season. Pair them with your Raven Slouchy Crew Sweatshirt, Raven Lightweight Zip Up Jacket or other favorite on the go fit. Made from 70% bamboo and 30% cotton.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/z4u3pinzgbmmqrmjwtil.jpg',
          publicId: 'ecommerce/products/z4u3pinzgbmmqrmjwtil',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/gi1nsepqp9pz6qy2jk4r.jpg',
          publicId: 'ecommerce/products/gi1nsepqp9pz6qy2jk4r',
        },
      ],
    },
    stock: 162,
    price: '100.00',
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: 'women_raven_joggers',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.WOMEN,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Kids Cybertruck Long Sleeve Tee',
    description:
      'Designed for fit, comfort and style, the Kids Cybertruck Graffiti Long Sleeve Tee features a water-based Cybertruck graffiti wordmark across the chest, a Tesla wordmark down the left arm and our signature T logo on the back collar. Made from 50% cotton and 50% polyester.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/uih2nqskgmvf2essrgx5.jpg',
          publicId: 'ecommerce/products/uih2nqskgmvf2essrgx5',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/dqaogzjibh3puuhnaov5.jpg',
          publicId: 'ecommerce/products/dqaogzjibh3puuhnaov5',
        },
      ],
    },
    stock: 10,
    price: '30.00',
    sizes: [Size.XS, Size.S, Size.M],
    slug: 'kids_cybertruck_long_sleeve_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.KID,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Kids Scribble T Logo Tee',
    description:
      'The Kids Scribble T Logo Tee is made from 100% Peruvian cotton and features a Tesla T sketched logo for every young artist to wear.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/tdflfa4jjkrpyth2b6of.jpg',
          publicId: 'ecommerce/products/tdflfa4jjkrpyth2b6of',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/wnkgp1fspnmotdl1f9qb.jpg',
          publicId: 'ecommerce/products/wnkgp1fspnmotdl1f9qb',
        },
      ],
    },
    stock: 0,
    price: '25.00',
    sizes: [Size.XS, Size.S, Size.M],
    slug: 'kids_scribble_t_logo_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.KID,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Kids Cybertruck Tee',
    description:
      'The Kids Cybertruck Tee features the iconic Cybertruck graffiti wordmark and is made from 100% Peruvian cotton for maximum comfort.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/o5jt1kij2wziqqyynmu7.jpg',
          publicId: 'ecommerce/products/o5jt1kij2wziqqyynmu7',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/qmzeyjgch7yo2a9xzrco.jpg',
          publicId: 'ecommerce/products/qmzeyjgch7yo2a9xzrco',
        },
      ],
    },
    stock: 10,
    price: '25.00',
    sizes: [Size.XS, Size.S, Size.M],
    slug: 'kids_cybertruck_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.KID,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Kids Racing Stripe Tee',
    description:
      "The refreshed Kids Racing Stripe Tee is made from 100% Peruvian cotton, featuring a newly enhanced racing stripe with a brushed Tesla wordmark that's perfect for any speed racer.",
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/s3nm5saoxwdpaekyr7ek.jpg',
          publicId: 'ecommerce/products/s3nm5saoxwdpaekyr7ek',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/luje1k8ygfydqkfgm7fk.jpg',
          publicId: 'ecommerce/products/luje1k8ygfydqkfgm7fk',
        },
      ],
    },
    stock: 10,
    price: '30.00',
    sizes: [Size.XS, Size.S, Size.M],
    slug: 'kids_racing_stripe_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.KID,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Kids 3D T Logo Tee',
    description:
      'Designed for fit, comfort and style, the Tesla T Logo Tee is made from 100% Peruvian cotton and features a silicone-printed T Logo on the left chest.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/rapn0tpv33kyhkp1nbuu.jpg',
          publicId: 'ecommerce/products/rapn0tpv33kyhkp1nbuu',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/tqkfl7tawdk7xxtnqxbr.jpg',
          publicId: 'ecommerce/products/tqkfl7tawdk7xxtnqxbr',
        },
      ],
    },
    stock: 10,
    price: '30.00',
    sizes: [Size.XS, Size.S, Size.M],
    slug: 'kids_3d_t_logo_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.KID,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Kids Checkered Tee',
    description:
      'The checkered tee is made from long grain, GMO free Peruvian cotton. Peru is the only country in the world where cotton is picked by hand on a large scale. The 4,500-year-old tradition prevents damage to the fiber during the picking process and removes the need to use chemicals to open the cotton plants before harvest. This environmentally friendly process results in cotton that is soft, strong, and lustrous – and the tee will get even softer with every wash.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/orstfpjo1ucjhahpqqlx.jpg',
          publicId: 'ecommerce/products/orstfpjo1ucjhahpqqlx',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/zhzu86uicqefwdb5uxco.jpg',
          publicId: 'ecommerce/products/zhzu86uicqefwdb5uxco',
        },
      ],
    },
    stock: 10,
    price: '30.00',
    sizes: [Size.XS, Size.S, Size.M],
    slug: 'kids_checkered_tee',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.KID,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Made on Earth by Humans Onesie',
    description:
      'For the future space traveler with discerning taste, a soft, cotton onesie with snap closure bottom. Clear labeling provided in case of contact with a new spacefaring civilization. 100% Cotton. Made in Peru',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/bfbpinshm5fyp5hzhtf7.jpg',
          publicId: 'ecommerce/products/bfbpinshm5fyp5hzhtf7',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/v4p2ededuzd8ew96f6so.jpg',
          publicId: 'ecommerce/products/v4p2ededuzd8ew96f6so',
        },
      ],
    },
    stock: 16,
    price: '25.00',
    sizes: [Size.XS, Size.S],
    slug: 'made_on_earth_by_humans_onesie',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.KID,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Scribble T Logo Onesie',
    description:
      'The Kids Scribble T Logo Onesie is made from 100% Peruvian cotton and features a Tesla T sketched logo for every little artist to wear.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/hreel3iswmtkvua2gv7v.jpg',
          publicId: 'ecommerce/products/hreel3iswmtkvua2gv7v',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/zpzcycnfekxdnej6uw2s.jpg',
          publicId: 'ecommerce/products/zpzcycnfekxdnej6uw2s',
        },
      ],
    },
    stock: 0,
    price: '30.00',
    sizes: [Size.XS, Size.S],
    slug: 'scribble_t_logo_onesie',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.KID,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Zero Emissions (Almost) Onesie',
    description:
      'Show your commitment to sustainable energy with this cheeky onesie for your young one. Note: Does not prevent emissions. 100% Cotton. Made in Peru.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/jubtrhpjdjtqifqrfeuf.jpg',
          publicId: 'ecommerce/products/jubtrhpjdjtqifqrfeuf',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/tpwkiy6wuqv8bzdqihgo.jpg',
          publicId: 'ecommerce/products/tpwkiy6wuqv8bzdqihgo',
        },
      ],
    },
    stock: 10,
    price: '30.00',
    sizes: [Size.XS, Size.S],
    slug: 'zero_emissions_(almost)_onesie',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.KID,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Kids Cyberquad Bomber Jacket',
    description:
      'Wear your Kids Cyberquad Bomber Jacket during your adventures on Cyberquad for Kids. The bomber jacket features a graffiti-style illustration of our Cyberquad silhouette and wordmark. With three zippered pockets and our signature T logo and Tesla wordmark printed along the sleeves, Kids Cyberquad Bomber Jacket is perfect for wherever the trail takes you. Made from 60% cotton and 40% polyester.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/tulwwvm8dvoswhvu39l8.jpg',
          publicId: 'ecommerce/products/tulwwvm8dvoswhvu39l8',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/ezl7cgvslsg03mhdf1bt.jpg',
          publicId: 'ecommerce/products/ezl7cgvslsg03mhdf1bt',
        },
      ],
    },
    stock: 10,
    price: '65.00',
    sizes: [Size.XS, Size.S, Size.M],
    slug: 'kids_cyberquad_bomber_jacket',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.KID,
    status: ProductStatus.PUBLISHED,
  },
  {
    name: 'Kids Corp Jacket',
    description:
      'Cruise the playground in style with the Kids Corp Jacket. Modeled after the original Tesla Corp Jacket, the Kids Corp Jacket features the same understated style and high-quality materials but at a pint-sized scale.',
    images: {
      create: [
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/crere1lkjuxjhgfgvdif.jpg',
          publicId: 'ecommerce/products/crere1lkjuxjhgfgvdif',
        },
        {
          url: 'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/isxtmwtwrkrxir5c39to.jpg',
          publicId: 'ecommerce/products/isxtmwtwrkrxir5c39to',
        },
      ],
    },
    stock: 10,
    price: '30.00',
    sizes: [Size.XS, Size.S, Size.M],
    slug: 'kids_corp_jacket',
    type: Type.SHIRTS,
    tags: ['shirt'],
    gender: Gender.KID,
    status: ProductStatus.PUBLISHED,
  },
];
