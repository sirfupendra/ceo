import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//import img from '../assets/virat.jpg'; // You can keep this for default or dynamically set it based on the response.

export default function Component() {
  const [playerData, setPlayerData] = useState(null); // Store player data
  const [selectedGround, setSelectedGround] = useState('');
  const [selectedBowler, setSelectedBowler] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Store search input
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Function to fetch player data from the backend
  const fetchPlayerData = async (playerName) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/player/${playerName}`);
      const data = await response.json();
      if (data) {
        setPlayerData(data);
        setSelectedGround(data.groundPerformance[0]?.ground || '');
        setSelectedBowler(data.bowlerPerformance[0]?.bowler || '');
      } else {
        alert('Player not found!');
      }
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
    setIsLoading(false);
  };

  // Handle search input submission
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      fetchPlayerData(searchQuery.trim());
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white text-black space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Search for a player..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Search
        </button>
      </form>

      {isLoading && <p>Loading player data...</p>}

      {playerData && (
        <>
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={playerData.imageUrl} // Change to playerData.imageUrl if coming from the database
                alt={playerData.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold">{playerData.name}</h1>
              <p className="text-xl text-gray-700">{playerData.team}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ground Performance */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle>Ground Performance</CardTitle>
                <CardDescription>Average and strike rate on different grounds</CardDescription>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setSelectedGround} defaultValue={selectedGround}>
                  <SelectTrigger className="w-full border-gray-300">
                    <SelectValue value={selectedGround} />
                  </SelectTrigger>
                  <SelectContent>
                    {playerData.groundPerformance.map((perf) => (
                      <SelectItem key={perf.ground} value={perf.ground}>
                        {perf.ground}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-4">
                  {playerData.groundPerformance.filter((perf) => perf.ground === selectedGround).length > 0 && (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={playerData.groundPerformance.filter((perf) => perf.ground === selectedGround)}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ground" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="average" fill="#8884d8" name="Average" />
                        <Bar dataKey="strikeRate" fill="#82ca9d" name="Strike Rate" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Maximum Scores */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle>Maximum Scores</CardTitle>
                <CardDescription>Highest individual scores in IPL</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Score</TableHead>
                      <TableHead>Against</TableHead>
                      <TableHead>Ground</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {playerData.maxScores.map((score, index) => (
                      <TableRow key={index}>
                        <TableCell>{score.score}</TableCell>
                        <TableCell>{score.against}</TableCell>
                        <TableCell>{score.ground}</TableCell>
                        <TableCell>{new Date(score.date).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Bowler Performance */}
            <Card className="bg-white shadow-md md:col-span-2">
              <CardHeader>
                <CardTitle>Performance Against Specific Bowlers</CardTitle>
                <CardDescription>Analysis of batting performance against particular bowlers</CardDescription>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setSelectedBowler} defaultValue={selectedBowler}>
                  <SelectTrigger className="w-full border-gray-300">
                    <SelectValue value={selectedBowler} />
                  </SelectTrigger>
                  <SelectContent>
                    {playerData.bowlerPerformance.map((perf) => (
                      <SelectItem key={perf.bowler} value={perf.bowler}>
                        {perf.bowler}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-4">
                  {playerData.bowlerPerformance.filter((perf) => perf.bowler === selectedBowler).length > 0 && (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={playerData.bowlerPerformance.filter((perf) => perf.bowler === selectedBowler)}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="bowler" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="runs" fill="#8884d8" name="Runs Scored" />
                        <Bar dataKey="balls" fill="#82ca9d" name="Balls Faced" />
                        <Bar dataKey="dismissals" fill="#ffc658" name="Dismissals" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
