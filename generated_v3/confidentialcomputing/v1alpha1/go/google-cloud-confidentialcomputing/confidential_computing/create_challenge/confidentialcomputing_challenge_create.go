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

// [START confidentialcomputing_v1alpha1_confidentialcomputing_challenge_create]

import (
	"context"
	"fmt"
	"io"

	confidentialcomputing "cloud.google.com/go/confidentialcomputing/apiv1alpha1"
	confidentialcomputingpb "cloud.google.com/go/confidentialcomputing/apiv1alpha1/confidentialcomputingpb"
)

// Use the CreateChallenge method.
func createChallenge(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	challenge := &confidentialcomputingpb.Challenge{}

	client, err := confidentialcomputing.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &confidentialcomputingpb.CreateChallengeRequest{
		Parent:    parent,
		Challenge: challenge,
	}

	resp, err := client.CreateChallenge(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateChallenge: %w", err)
	}

	fmt.Fprintf(w, "Created challenge: %s\n", resp.GetName())

	return nil
}

// [END confidentialcomputing_v1alpha1_confidentialcomputing_challenge_create]
