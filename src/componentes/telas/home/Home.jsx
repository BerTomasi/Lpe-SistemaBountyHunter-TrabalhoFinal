import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getServicosFirebase } from '../../../servicos/ServicosService';

function Home() {

    const [listaObjetos, setListaObjetos] = useState([]);

    useEffect(() => {
        getServicosFirebase(setListaObjetos);
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" component="div">
                Serviços de recompensas disponíveis:
            </Typography>
            {listaObjetos.length === 0 && (
                <Typography variant="h5" component="div">
                    Nenhum registro encontrado
                </Typography>
            )}

            <Grid container spacing={2}>
                {listaObjetos.length > 0 && (
                    listaObjetos.map(objeto => (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}
                            key={objeto.id}>
                            <Card sx={{ minWidth: 50 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Tipo de Serviço: {objeto.tipoServico}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {objeto.titulo}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Criatura: {objeto.criatura}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Localização: {objeto.localizacao}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Descrição: {objeto.descricao}
                                    </Typography>
                                    {objeto.imgUrl && (
                                        <div>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                Imagem do Serviço:
                                            </Typography>
                                            <img src={objeto.imgUrl} alt="Imagem do Serviço" style={{ maxWidth: '100%', height: 'auto' }} />
                                        </div>
                                    )}
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Recompensa (Dracmas): {objeto.recompensa}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Contratante: {objeto.contratante}
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        Usuário: {objeto.usuario}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Email: {objeto.email}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    )
}

export default Home;
