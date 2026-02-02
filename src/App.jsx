import { useState, useEffect } from 'react'
import hskWordsJson from './assets/hsk.json'
import './App.css'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { shuffleArray } from './utils.jsx'

function App() {
  const hskLevels = ['1', '2', '3', '4', '5', '6'];
  const [selectedLevels, setSelectedLevels] = useState(new Set(['1', '2', '3']));
  const [hskWords, setHskWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const filtered = hskWordsJson.filter(char => selectedLevels.has(String(char.hsk)));
    const shuffled = shuffleArray(filtered)
    setHskWords(shuffled);
    setIndex(0);
    setRevealed(false);
  }, [selectedLevels])

  const handleNext = () => {
    setIndex((i) => (i + 1) % hskWords.length);
    setRevealed(false);
  }

  const toggleLevel = (level) => {
    const newLevels = new Set(selectedLevels);
    newLevels.has(level) ? newLevels.delete(level) : newLevels.add(level);
    setSelectedLevels(newLevels);
  }

  const character = hskWords[index];

  return (
    <Container className="mt-2">
      <h1 className="text-center mb-4">HSK Word Tester</h1>

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <Form>
                <div className="d-flex flex-wrap  justify-content-center">
                  {hskLevels.map(level => (
                    <Form.Check
                      inline
                      key={level}
                      label={`HSK ${level}`}
                      type="checkbox"
                      id={`hsk-${level}`}
                      checked={selectedLevels.has(level)}
                      onChange={() => toggleLevel(level)}
                      className="me-2"
                    />
                  ))}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          {character && (
            <>
              <Card>
                <Card.Body>
                  <Row className="align-items-center justify-content-center">
                    <Col xs="auto" className="text-center d-flex flex-column align-items-center">
                      <div className="hanzi-variants">
                        <p className="hanzi-serif mb-0">{character.hanzi}</p>
                        <p className="hanzi-text mb-0">{character.hanzi}</p>
                      </div>
                    </Col>
                  </Row>

                  <div className="d-flex gap-2 mt-3 justify-content-center">
                    <Button variant="primary" className="reveal-btn" onClick={() => setRevealed(!revealed)}>
                      {revealed ? 'Hide' : 'Reveal'}
                    </Button>
                    <Button variant="success" onClick={handleNext} disabled={hskWords.length === 0}>
                      Next Word
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              {revealed && (
                <Card className="mt-3">
                  <Card.Body>
                    <div className="mb-3">
                      <p><strong>Pinyin:</strong> {character.pinyin}</p>
                      <p><strong>Meaning:</strong> {character.meaning}</p>
                      {selectedLevels.size > 1 && <p><strong>HSK Level:</strong> {character.hsk}</p>}
                    </div>
                  </Card.Body>
                </Card>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default App
