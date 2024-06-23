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
        res.status(404).json({
          message: 'Contact not found',
        });
        return;
      }

      res.status(200).json({
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong',
        error: error.message,
      });
    }
  });

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await fetchAllContacts();

      res.status(200).json({
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({
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
