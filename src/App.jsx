
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function App() {
  const positions = ["A", "B", "C", "D", "E"];
  const initialNotes = {
    somaABC: "", somaBCD: "", somaCDE: "", somaABCDE: "",
    qtdPretos: "", qtdBrancos: "", qtdPares: "", qtdImpares: "",
    marcados: Array(10).fill(false)
  };
  const [players, setPlayers] = useState([
    { id: "jogador1", name: "Jogador 1", code: positions.map(() => ({ number: "", color: "" })), notes: { ...initialNotes } },
    { id: "jogador2", name: "Jogador 2", code: positions.map(() => ({ number: "", color: "" })), notes: { ...initialNotes } },
  ]);
  const [tab, setTab] = useState(players[0].id);

  const handleChange = (playerIndex, positionIndex, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].code[positionIndex][field] = value;
    setPlayers(updatedPlayers);
  };

  const handleNoteChange = (playerIndex, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].notes[field] = value;
    setPlayers(updatedPlayers);
  };

  const toggleMark = (playerIndex, num) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].notes.marcados[num] = !updatedPlayers[playerIndex].notes.marcados[num];
    setPlayers(updatedPlayers);
  };

  const addPlayer = () => {
    const newPlayer = {
      id: `jogador${players.length + 1}`,
      name: `Jogador ${players.length + 1}`,
      code: positions.map(() => ({ number: "", color: "" })),
      notes: { ...initialNotes },
    };
    setPlayers([...players, newPlayer]);
    setTab(newPlayer.id);
  };

  const resetGame = () => {
    setPlayers(players.map(p => ({
      ...p,
      code: positions.map(() => ({ number: "", color: "" })),
      notes: { ...initialNotes },
    })));
  };

  const colorBox = (color) => (
    <div className={`w-4 h-4 rounded-full mx-auto ${
      color === "preto" ? "bg-black" :
      color === "branco" ? "bg-white border" :
      color === "verde" ? "bg-green-500" : "border"
    }`} />
  );

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Qual é o Código?</h1>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid grid-cols-2 overflow-x-auto">
          {players.map((player) => (
            <TabsTrigger key={player.id} value={player.id}>
              {player.name}
            </TabsTrigger>
          ))}
          <Button variant="outline" onClick={addPlayer} className="text-xs px-2 py-1">
            + Jogador
          </Button>
        </TabsList>

        {players.map((player, playerIndex) => (
          <TabsContent key={player.id} value={player.id}>
            <Card className="mt-4">
              <CardContent className="space-y-4 pt-4">
                <h2 className="text-lg font-semibold">{player.name} - Código Secreto</h2>
                <div className="grid grid-cols-5 gap-2">
                  {positions.map((label, i) => (
                    <div key={label} className="space-y-1">
                      <Input
                        type="number"
                        min="0"
                        max="9"
                        placeholder={label}
                        value={player.code[i].number}
                        onChange={(e) => handleChange(playerIndex, i, "number", e.target.value)}
                        className="text-center"
                      />
                      <Select
                        onValueChange={(value) => handleChange(playerIndex, i, "color", value)}
                        value={player.code[i].color}
                      >
                        <SelectTrigger>{colorBox(player.code[i].color)}</SelectTrigger>
                        <SelectContent>
                          <SelectItem value="branco">{colorBox("branco")}</SelectItem>
                          <SelectItem value="preto">{colorBox("preto")}</SelectItem>
                          <SelectItem value="verde">{colorBox("verde")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardContent className="space-y-4 pt-4">
                <h2 className="text-lg font-semibold">Anotações & Deduções</h2>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Soma ABC" value={player.notes.somaABC} onChange={(e) => handleNoteChange(playerIndex, "somaABC", e.target.value)} />
                  <Input placeholder="Soma BCD" value={player.notes.somaBCD} onChange={(e) => handleNoteChange(playerIndex, "somaBCD", e.target.value)} />
                  <Input placeholder="Soma CDE" value={player.notes.somaCDE} onChange={(e) => handleNoteChange(playerIndex, "somaCDE", e.target.value)} />
                  <Input placeholder="Soma ABCDE" value={player.notes.somaABCDE} onChange={(e) => handleNoteChange(playerIndex, "somaABCDE", e.target.value)} />
                  <Input placeholder="Qtd. Pretos" value={player.notes.qtdPretos} onChange={(e) => handleNoteChange(playerIndex, "qtdPretos", e.target.value)} />
                  <Input placeholder="Qtd. Brancos" value={player.notes.qtdBrancos} onChange={(e) => handleNoteChange(playerIndex, "qtdBrancos", e.target.value)} />
                  <Input placeholder="Qtd. Pares" value={player.notes.qtdPares} onChange={(e) => handleNoteChange(playerIndex, "qtdPares", e.target.value)} />
                  <Input placeholder="Qtd. Ímpares" value={player.notes.qtdImpares} onChange={(e) => handleNoteChange(playerIndex, "qtdImpares", e.target.value)} />
                </div>

                <div className="flex gap-1 flex-wrap justify-center pt-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Button
                      key={i}
                      variant={player.notes.marcados[i] ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleMark(playerIndex, i)}
                      className="w-8 h-8 p-0"
                    >
                      {i}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex gap-2">
        <Button className="flex-1">Salvar ou Compartilhar</Button>
        <Button variant="destructive" onClick={resetGame}>Reiniciar Jogo</Button>
      </div>
    </div>
  );
}
