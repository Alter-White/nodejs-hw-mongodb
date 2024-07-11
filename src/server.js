import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { fetchAllContacts, findContactById } from './services/contacts.js';
import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await findContactById(contactId);

      if (!contact) {
        res.json({
          status: 404,
          message: 'Contact not found',
        });
        return;
      }

      res.json({
        status: 200,
        message: 'Successfully found contact!',
        data: contact,
      });
    } catch (error) {
      res.json({
        status: '500',
        message: 'Something went wrong',
        error: error.message,
      });
    }
  });

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await fetchAllContacts();

      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.json({
        status: 500,
        message: 'Something went wrong',
        error: error.message,
      });
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
