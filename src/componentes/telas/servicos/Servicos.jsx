import { useState, useEffect } from "react";
import ServicosContext from "./ServicosContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { auth } from "../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    getServicosUIDFirebase, addServicoFirebase,
    updateServicoFirebase, getServicosFirebase,
    deleteServicoFirebase
} from "../../../servicos/ServicosService";
import { Navigate } from "react-router-dom";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

function Servicos() {

    const [user, loading, error] = useAuthState(auth);

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: '',
        titulo: '',
        criatura: '',
        tipoServico: '',
        localizacao: '',
        descricao: '',
        recompensa: '',
        contratante: '',
        imgUrl: '',
        usuario: '',
        email: '',
        uid: ''
    });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: '',
            titulo: '',
            criatura: '',
            tipoServico: '',
            localizacao: '',
            descricao: '',
            recompensa: '',
            contratante: '',
            imgUrl: '',
            usuario: user?.displayName,
            email: user?.email,
            uid: user?.uid
        });
        setAbreDialogo(true)
    }

    const editarObjeto = async (objeto) => {
        setObjeto(objeto);
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {
            try {
                
                // Verifica se há uma imagem no objeto
                if (objeto.imgUrl) {
                    const file = objeto.imgUrl;
                    const storageRef = ref(storage, `images/${uuidv4()}`);
        
                    // Faz o upload do arquivo
                    const snapshot = await uploadBytes(storageRef, file);
        
                    // Obtém a URL do arquivo após o upload
                    const url = await getDownloadURL(snapshot.ref);
                    console.log("File available at", url);
        
                    // Adiciona a URL da imagem no objeto
                    objeto.imgUrl = url;
                }
        
                // Adiciona o serviço ao Firebase
                await updateServicoFirebase(objeto);
                setAlerta({ status: "success", message: "Post atualizado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar o POST:" + err });
            }
        } else { // novo 
            try {
                // Verifica se há uma imagem no objeto
                if (objeto.imgUrl) {
                    const file = objeto.imgUrl;
                    const storageRef = ref(storage, `images/${uuidv4()}`);
        
                    // Faz o upload do arquivo
                    const snapshot = await uploadBytes(storageRef, file);
        
                    // Obtém a URL do arquivo após o upload
                    const url = await getDownloadURL(snapshot.ref);
                    console.log("File available at", url);
        
                    // Adiciona a URL da imagem no objeto
                    objeto.imgUrl = url;
                }
        
                // Adiciona o serviço ao Firebase
                const result = await addServicoFirebase(objeto);
        
                // Atualiza o objeto com o resultado retornado e define o estado de edição
                setObjeto(result);
                setEditar(true);
        
                // Define um alerta de sucesso
                setAlerta({ status: "success", message: "Serviço criado com sucesso" });
            } catch (err) {
                // Define um alerta de erro caso ocorra algum problema
                setAlerta({ status: "error", message: "Erro ao criar o serviço: " + err });
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                deleteServicoFirebase(objeto);
                setAlerta({ status: "success", message: "Servico removido com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao  remover: " + err });
            }
        }
    }

    useEffect(() => {
        setCarregando(true);
        if (user?.uid != null) {
            const uid = user?.uid;
            getServicosUIDFirebase(uid, setListaObjetos);
        }
        setCarregando(false);
    }, []);

    if (user) {
        return (
            <ServicosContext.Provider value={{
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                remover,
                objeto, setObjeto,
                editarObjeto, novoObjeto, acaoCadastrar,
                handleChange, abreDialogo, setAbreDialogo
            }}>
                <Carregando carregando={carregando}>
                    <Tabela />
                </Carregando>
                <Form />
            </ServicosContext.Provider>
        )
    } else {
        return <Navigate to="/" />
    }


}

export default Servicos;