// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START gsuiteaddons_v1_gsuiteaddons_authorization_get]

import (
	"context"
	"fmt"
	"io"

	gsuiteaddons "cloud.google.com/go/gsuiteaddons/apiv1"
	gsuiteaddonspb "cloud.google.com/go/gsuiteaddons/apiv1/gsuiteaddonspb"
)

// getAuthorization retrieves add-ons authorization information for a project.
func getAuthorization(ctx context.Context, w io.Writer, projectID string) error {
	name := fmt.Sprintf("projects/%s/authorization", projectID)

	client, err := gsuiteaddons.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &gsuiteaddonspb.GetAuthorizationRequest{
		Name: name,
	}

	auth, err := client.GetAuthorization(ctx, req)
	if err != nil {
		return fmt.Errorf("GetAuthorization failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved authorization: %s\n", auth.GetName())
	return nil
}

// [END gsuiteaddons_v1_gsuiteaddons_authorization_get]
