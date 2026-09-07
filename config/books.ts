export const AMAZON_AUTHOR_URL =
  'https://www.amazon.com/stores/Ibrar-Ahmed/author/B0D8MDH2KG'

export interface Book {
  title: string
  subtitle?: string
  authors: string
  year: string
  cover: string
  href: string
}

export const BOOKS: Book[] = [
  {
    title: 'Database Design and Modeling with PostgreSQL and MySQL',
    subtitle:
      'Build efficient and scalable databases for modern applications using open source databases',
    authors: 'Alkin Tezuysal, Ibrar Ahmed',
    year: '2024',
    cover: '/books/database-design-postgresql-mysql.png',
    href: 'https://www.amazon.com/Database-Design-Modeling-PostgreSQL-MySQL/dp/1803233478',
  },
  {
    title: 'PostgreSQL 10 High Performance',
    subtitle:
      'Expert techniques for query optimization, high availability, and efficient database maintenance',
    authors: 'Ibrar Ahmed, Gregory Smith, Enrico Pirozzi',
    year: '2018',
    cover: '/books/postgresql-10-high-performance-cover.png',
    href: 'https://www.amazon.com/PostgreSQL-High-Performance-optimization-availability/dp/1788474481',
  },
  {
    title: 'PostgreSQL 9.6 High Performance',
    subtitle:
      'Optimize your database with configuration tuning, routine maintenance, monitoring tools, query optimization and more',
    authors: 'Ibrar Ahmed, Gregory Smith',
    year: '2017',
    cover: '/books/postgresql-9-6-high-performance.jpg',
    href: 'https://www.amazon.com/PostgreSQL-High-Performance-configuration-optimization/dp/1783988987',
  },
  {
    title: "PostgreSQL Developer's Guide",
    subtitle: 'Design, develop, and implement streamlined databases with PostgreSQL',
    authors: 'Ibrar Ahmed, Asif Fayyaz, Amjad Shahzad',
    year: '2015',
    cover: '/books/postgresql-developers-guide.png',
    href: 'https://www.amazon.com/PostgreSQL-Developer-Guide-Ibrar-Ahmed/dp/1783989025',
  },
]
