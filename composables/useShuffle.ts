export function shuffleArray(array:any) {
    for (let i = array.length - 1; i > 0; i--) {
      // Gera um índice aleatório entre 0 e i
      const j = Math.floor(Math.random() * (i + 1));
      
      // Troca os elementos de índice i e j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }