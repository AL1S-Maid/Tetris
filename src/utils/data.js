export const blockMod = () => {
  let a = {
    site: [0, 1, 0, 2, 1, 2, 2, 2],
    color: '#5219FF'
  };
  let b = {
    site: [0, 1, 1, 1, 1, 2, 2, 2],
    color: '#51DBFC'
  };
  let c = {
    site: [1, 1, 1, 2, 2, 1, 2, 2],
    color: '#47FCC1'
  };
  let d = {
    site: [1, 0, 1, 1, 1, 2, 1, 3],
    color: '#FAFC34'
  };
  let e = {
    site: [0, 2, 1, 1, 1, 2, 2, 1],
    color: '#FCAF4B'
  };
  let f = {
    site: [0, 1, 0, 2, 1, 2, 2, 2],
    color: '#FC4444'
  };
  let g = {
    site: [1, 1, 2, 0, 2, 1, 2, 2],
    color: '#FCB4E4'
  };
  return ([a, b, c, d, e, f, g])
}

export const transition = [
  [
    {
      x: 1, y: 1,
    }, {
      x: 1, y: 0,
    }, {
      x: 0, y: -2,
    }, {
      x: -2, y: 1,
    }
  ],
  [
    {
      x: 1, y: 1,
    }, {
      x: 1, y: 0,
    }, {
      x: 0, y: -2,
    }, {
      x: -2, y: 1,
    }
  ],
  [
    {
      x: 0, y: 1,
    }, {
      x: 1, y: 0,
    }, {
      x: 0, y: -1,
    }, {
      x: -1, y: 0,
    }
  ],
  [
    {
      x: -1, y: 2,
    }, {
      x: 1, y: 1,
    }, {
      x: 2, y: -1,
    }, {
      x: -2, y: -2,
    }
  ],
  [
    {
      x: 2, y: 0,
    }, {
      x: 0, y: -1,
    }, {
      x: -1, y: -1,
    }, {
      x: -1, y: 2,
    }
  ],
  [
    {
      x: 1, y: 1,
    }, {
      x: 1, y: 0,
    }, {
      x: 0, y: -2,
    }, {
      x: -2, y: 1,
    }
  ],
  [
    {
      x: 0, y: 0,
    }, {
      x: 1, y: 0,
    }, {
      x: -1, y: 0,
    }, {
      x: 0, y: 0,
    }
  ],
]