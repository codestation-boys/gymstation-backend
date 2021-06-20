class FakeTimes
{
  public takeOneSecond(): Promise<void>
  {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000)
    })
  }
}

export default new FakeTimes()