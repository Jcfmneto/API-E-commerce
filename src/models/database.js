import pg from "pg";
const { Client } = pg;

const client = new Client({
  host: "localhost",
  user: "postgres",
  database: "postgres",
  password: "04583828",
  port: 5432,
});

async function connectDB() {
  try {
    await client.connect();
    console.log('Conectado ao banco de dados com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  }
}


connectDB();

async function query(sql, params) {
  try {
    const res = await client.query(sql, params);
    return res.rows;
  } catch (error) {
    console.error("Erro na query:", error);
    throw error;
  }
}

export default query;
