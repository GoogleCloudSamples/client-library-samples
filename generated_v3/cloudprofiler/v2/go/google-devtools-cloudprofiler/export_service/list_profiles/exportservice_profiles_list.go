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

// [START cloudprofiler_v2_exportservice_profiles_list]
import (
	"context"
	"fmt"
	"io"

	cloudprofiler "cloud.google.com/go/cloudprofiler/apiv2"
	cloudprofilerpb "cloud.google.com/go/cloudprofiler/apiv2/cloudprofilerpb"
	"google.golang.org/api/iterator"
)

// listProfiles lists profiles exported for the specified project.
func listProfiles(ctx context.Context, w io.Writer, userProjectID string) error {
	parent := fmt.Sprintf("projects/%s", userProjectID)

	client, err := cloudprofiler.NewExportClient(ctx)
	if err != nil {
		return fmt.Errorf("cloudprofiler.NewExportClient: %w", err)
	}
	defer client.Close()

	req := &cloudprofilerpb.ListProfilesRequest{
		Parent: parent,
	}

	it := client.ListProfiles(ctx, req)
	count := 0
	for {
		profile, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListProfiles: %w", err)
		}
		fmt.Fprintf(w, "Profile: %s\n", profile.GetName())
		count++
	}

	fmt.Fprintf(w, "Listed %d profile(s).\n", count)
	return nil
}

// [END cloudprofiler_v2_exportservice_profiles_list]
