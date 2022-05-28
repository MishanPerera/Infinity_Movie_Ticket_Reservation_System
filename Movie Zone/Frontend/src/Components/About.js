import React from 'react'
import Navbar from './Navbar'

export default function About() {
  return (
    <>
        <Navbar/>
        <div className="row d-flex justify-content-center h-100">
        <div className="card align-items-center justify-content-center shadow-5-strong w-50 customer">
          <h1>About</h1>
          <p>
              Welcome to MOVIE ZONE, your number one source for all things [product, ie: shoes, bags, dog treats]. We're dedicated to giving you the very best of [product], with a focus on [three characteristics, ie: dependability, customer service and uniqueness.]
              Founded in 2021 by DEVX, Movie Zone has come a long way from its beginnings in a [starting location, ie: home office, toolshed, Houston, TX.]. When [store founder] first started out, his/her passion for [passion of founder, ie: helping other parents be more eco-friendly, providing the best equipment for his fellow musicians] drove him to [action, ie: do intense research, quit her day job], and gave him the impetus to turn hard work and inspiration into to a booming online store. We now serve customers all over [place, ie: the US, the world, the Austin area], and are thrilled to be a part of the [adjective, ie: quirky, eco-friendly, fair trade] wing of the [industry type, ie: fashion, baked goods, watches] industry.

              We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.

              Sincerely,
              Name, [title, ie: CEO, Founder, etc.]
          </p>
        </div>
        </div>
    </>
  )
}

