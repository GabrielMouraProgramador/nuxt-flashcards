<template>
  <div class="pa-2">
    <SumaryCard
      @eye="setAnswers"
      :info="info"
      :todayCards="todayCards.length"
      :notStudied="
        alreadyStudied.length - todayCards.length > 0
          ? 0
          : todayCards.length - alreadyStudied.length
      "
      :review="alreadyStudied.length"
    />

    <CardProgress
      :allCards="allCards.length"
      :notStudied="
        alreadyStudied.length - todayCards.length < 0
          ? 0
          : alreadyStudied.length - todayCards.length
      "
      :studiedCards="alreadyStudied.length"
    />
    <ListCard @refresh="refresh()" :cards="allCards" :answers="answers" />
  </div>
</template>
