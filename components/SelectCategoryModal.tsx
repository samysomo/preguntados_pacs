import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store'; 
import { GET_COMPLETED_THEMES } from '@/constants';

type CreateAccountModalProps = {
  isOpen: boolean;
  setSelectCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// Definir el tipo de categoría
interface Category {
    id: number;
    name: string;
    color: string;
}

const categories: Category[] = [
    { id: 1, name: "pruebas_unitarias", color: "#db7093" },
    { id: 2, name: "unitarias", color: "#20b2aa" },
    { id: 3, name: "pruebas_de_ntegracion", color: "#d63e92" },
    { id: 4, name: "pruebas_funcionales", color: "#daa520" },
    { id: 5, name: "pruebas_end_to_end", color: "#ff340f" },
    { id: 6, name: "pruebas_de_aceptacion", color: "#3cb371" },
    { id: 7, name: "corona", color: "#ecff00" }
];

const SelectCategoryModal = ({ isOpen, setSelectCategoryModal }: CreateAccountModalProps) => {
    const router = useRouter();
    const [crownCategory, setCrownCategory] = useState("Elige una!");
    const [completedThemes, setCompletedThemes] = useState<string[]>([]); // Siempre será un array de strings
    const setCategory = useAppStore((state) => state.setCategory);
    const { matchId } = useAppStore((state) => ({
      matchId: state.matchId, // Obtener el matchId desde el store
    }));

    // Efecto para obtener los temas completados al abrir el modal
    useEffect(() => {
      const fetchCompletedThemes = async () => {
        if (isOpen) {
          try {
            const response = await apiClient.get(`${GET_COMPLETED_THEMES}${matchId}`, { withCredentials: true });

            // Verifica que response.data.completedThemes sea un array
            if (Array.isArray(response.data.completedThemes)) {
              setCompletedThemes(response.data.completedThemes); // Asignar los temas completados al estado
            } else {
              console.error("completedThemes is not an array:", response.data.completedThemes);
              setCompletedThemes([]); // Reiniciar a un array vacío si no es un array
            }
          } catch (error) {
            console.error("Error fetching completed themes:", error);
            setCompletedThemes([]); // Reiniciar a un array vacío en caso de error
          }
        }
      };

      fetchCompletedThemes();
    }, [isOpen, matchId]);

    const handleSelectCategory = () => {
      if (crownCategory !== "Elige una!") {
        // Establecer la categoría seleccionada
        const isFinalQuestion = true;
        setCategory(crownCategory, isFinalQuestion);
        setSelectCategoryModal(false); // Cerrar el modal
        router.push("/question");
      }
    };

    if (!isOpen) return null;

    return (
      <div className='fixed inset-0 bg-black-2 bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[600px] lg:w-[800px] flex flex-col rounded-lg shadow-lg overflow-hidden'>
          <header className="bg-gradient-to-b from-[#12003b] to-[#38006b] p-5 w-full rounded-t-lg">
            <h2 className="text-white text-3xl font-bold text-center">Selecciona una categoría</h2>
          </header>
          <div className='flex gap-16 bg-gradient-to-r from-[#300d66] to-[#fc466b] p-10'>
            <div className='grid grid-cols-2 gap-6'>
              {categories.map((category) => (
                !(category.name === "corona") && (
                  <div 
                    key={category.id}
                    className={`flex items-center justify-center p-5 text-white font-bold text-sm cursor-pointer rounded-lg ${completedThemes.includes(category.name) ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    style={{ backgroundColor: category.color }}
                    onClick={() => {
                      if (!completedThemes.includes(category.name)) {
                        setCrownCategory(category.name);
                      }
                    }}
                  >
                    {category.name}
                  </div>
                )
              ))}
            </div>
            <div className='flex flex-col justify-center gap-5 min-w-[200px]'>
              <div className='flex justify-center items-center bg-gradient-to-b from-[#12003b] to-[#38006b] rounded-md'>
                <h3 className='text-white text-center font-bold p-5'>{crownCategory}</h3>
              </div>
              <Button variant="outline" className='text-white' onClick={handleSelectCategory}>
                Seleccionar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SelectCategoryModal;
