/*
 * Copyright 2014 Alexandre Pretto Nunes
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define(['flight/lib/component', 'component/mixins/with_auth_token_from_hash'],
  function (defineComponent, withAuthTokeFromHash) {
    return defineComponent(githubUser, withAuthTokeFromHash);

    function githubUser() {
      this.getCurrentGithubUser = function (ev, previousData) {
        var token = this.getCurrentAuthToken();

        $.getJSON('https://api.github.com/user', {access_token: token}, function (userData) {
          var newData = _.clone(previousData);
          newData.user = userData
          this.trigger('data:githubUser:here', newData);
        }.bind(this));
      }

      this.after('initialize', function () {
        this.on('ui:needs:githubUser', this.getCurrentGithubUser);
      });
    }
  }
);
