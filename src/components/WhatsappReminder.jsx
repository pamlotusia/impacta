import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { getDatabase, ref, get } from 'firebase/database';

const WhatsappReminder = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;

    // Função para obter dados do banco de dados
    const fetchUserData = async () => {
      if (user) {
        const userId = user.uid;
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);

        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserData(userData);
          } else {
            alert('Dados do usuário não encontrados');
          }
        } catch (e) {
          alert(e.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    // Verifica se existem dados no armazenamento local
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData) {
      setUserData(storedUserData);
      setIsLoading(false);
    } else {
      fetchUserData();
    }
  }, []);

  // Atualiza o armazenamento local quando os dados do usuário mudam
  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : userData ? (
        <div>
          <label>
            <input type="checkbox" />
            Desejo receber lembrete no WhatsApp {userData.phone}
          </label>
        </div>
      ) : (
        <p>Dados do usuário não encontrados</p>
      )}
    </div>
  );
};

export default WhatsappReminder