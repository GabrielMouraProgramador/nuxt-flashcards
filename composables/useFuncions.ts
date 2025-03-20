export function getNextTime(dificuldade_atual:string, time_atual:string, dificuldade_antiga:string) {
    // Converte tempo para minutos
    const parseTime = (time:string) => {
      const match = time.match(/(\d+)([dhm])/);
      if (!match) return 0;

      const value = parseInt(match[1]);
      const unit = match[2];

      if (unit === "d") return value * 24 * 60; // Dias para minutos
      if (unit === "h") return value * 60; // Horas para minutos
      if (unit === "m") return value; // Minutos

      return 0;
    };

    // Formata o tempo de volta para string
    const formatTime = (minutes:number) => {
      if (minutes >= 1440) return `${Math.floor(minutes / 1440)}d`; // Dias
      if (minutes >= 60) return `${Math.floor(minutes / 60)}h`; // Horas
      return `${minutes}m`; // Minutos
    };

    // Tempo base
    let time_facil = 3 * 24 * 60; // 3d em minutos
    let time_bom = 15; // 15m
    let time_dificil = 8; // 8m

    let time_atual_min = parseTime(time_atual);

    if (dificuldade_atual === dificuldade_antiga) {
      time_facil = Math.min(time_atual_min * 4, 64800); // Máx 45 dias
      time_bom = Math.min(time_atual_min + 8, 21600); // Máx 15 dias
    } else {
      if (dificuldade_atual === "facil") {
        time_facil = Math.min(time_atual_min * 3, 64800); // Máx 45 dias
      }
      if (["bom", "dificil"].includes(dificuldade_atual)) {
        time_facil = Math.min(time_atual_min + 1100, 64800); // Máx 45 dias
        time_bom = Math.min(time_atual_min + 15, 21600); // Máx 15 dias
      }
    }

    return {
      facil: formatTime(time_facil),
      bom: formatTime(time_bom),
      dificil: formatTime(time_dificil),
      agora: "agora",
    };
  }